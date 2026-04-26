//Lab
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
    finish(new AbortError());
  }

  signal.addEventListener("abort", onAbort);

  if (signal.aborted) {
    return finish(new AbortError());
  }

  let completed = 0;

  for (const [index, item] of arr.entries()) {
    const timer = setTimeout(() => {
      if (finished) return;

      predicate(item, (err, passed) => {
        if (finished) return;

        if (err) {
          return finish(err);
        }

        if (passed) {
          results.set(index, item);
        }

        completed++;

        if (completed === arr.length) {
          const ordered = [...results.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(([_, value]) => value);

          finish(null, ordered);
        }
      });
    }, 0);

    timers.push(timer);
  }
}

function filterPromise(arr, predicate, signal) {
  return new Promise((resolve, reject) => {
    const timers = [];
    const results = new Map();
    let finished = false;

    function cleanup() {
      timers.forEach(clearTimeout);
      signal.removeEventListener("abort", onAbort);
    }

    function finish(err, value) {
      if (finished) return;
      finished = true;
      cleanup();

      if (err) reject(err);
      else resolve(value);
    }

    function onAbort() {
      finish(new AbortError());
    }

    signal.addEventListener("abort", onAbort);

    if (signal.aborted) {
      return finish(new AbortError());
    }

    let completed = 0;

    for (const [index, item] of arr.entries()) {
      const timer = setTimeout(async () => {
        if (finished) return;

        try {
          const passed = await predicate(item, index);

          if (finished) return;

          if (passed) {
            results.set(index, item);
          }

          completed++;

          if (completed === arr.length) {
            const ordered = [...results.entries()]
              .sort((a, b) => a[0] - b[0])
              .map(([_, value]) => value);

            finish(null, ordered);
          }
        } catch (err) {
          finish(err);
        }
      }, 0);

      timers.push(timer);
    }
  });
}

module.exports = { filterCallback, filterPromise, sleep, AbortError };