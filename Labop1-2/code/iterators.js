function iterateWithTimeout(iterator, count, delay = 1000) {
  let i = 0;

  const interval = setInterval(() => {
    if (i >= count) {
      clearInterval(interval);
      return;
    }

    console.log(iterator.next().value);
    i++;
  }, delay);
}

module.exports = { iterateWithTimeout };