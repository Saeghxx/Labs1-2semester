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
function filterPromise(arr, predicate, signal) {
  return new Promise((resolve, reject) => {
    const timers = [];
    const results = new Map();
    let finished = false;
    let aborted = signal.aborted;

    function cleanup() {
      timers.forEach(clearTimeout);
      signal.removeEventListener("abort", onAbort);
    }

    function onAbort() {
      aborted = true;
      finish(new AbortError());
    }

    function finish(err, value) {
      if (finished) return;
      finished = true;
      cleanup();

      if (err) reject(err);
      else resolve(value);
    }

    signal.addEventListener("abort", onAbort);

    if (aborted) return finish(new AbortError());

    let done = 0;

    (async () => {
      for (const [i, item] of arr.entries()) {
        const t = setTimeout(async () => {
          if (aborted || finished) return;

          try {
            const ok = await predicate(item, i);

            if (aborted || finished) return;

            if (ok) results.set(i, item);

            done++;

            if (done === arr.length) {
              const ordered = [...results.entries()]
                .sort((a, b) => a[0] - b[0])
                .map(([_, v]) => v);

              finish(null, ordered);
            }
          } catch (e) {
            finish(e);
          }
        }, 0);

        timers.push(t);
      }
    })();
  });
}

module.exports = { filterCallback, filterPromise };