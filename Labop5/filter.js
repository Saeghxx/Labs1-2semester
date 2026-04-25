class AbortError extends Error {
  constructor() {
    super("Operation aborted");
    this.name = "AbortError";
  }
}

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function filterCallback(arr, predicate, cb, signal) {
  const timers = [];
  const results = new Map();
  let finished = false;
  let aborted = signal.aborted;

  function cleanup() {
    timers.forEach(clearTimeout);
    signal.removeEventListener("abort", onAbort);
  }

  function finish(err, value) {
    if (finished) return;
    finished = true;
    cleanup();
    cb(err, value);
  }

  function onAbort() {
    aborted = true;
    finish(new AbortError());
  }

  signal.addEventListener("abort", onAbort);

  if (aborted) return finish(new AbortError());

  let done = 0;

  for (const [i, item] of arr.entries()) {
    const t = setTimeout(() => {
      if (aborted || finished) return;

      predicate(item, (err, ok) => {
        if (aborted || finished) return;

        if (err) return finish(err);

        if (ok) results.set(i, item);

        done++;

        if (done === arr.length) {
          const ordered = [...results.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(([_, v]) => v);

          finish(null, ordered);
        }
      });
    }, 0);

    timers.push(t);
  }
}
