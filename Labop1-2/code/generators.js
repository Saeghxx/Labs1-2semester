function* roundRobinGenerator(arr) {
  let i = 0;
  while (true) {
    yield arr[i % arr.length];
    i++;
  }
}

module.exports = { roundRobinGenerator };