const { roundRobinGenerator } = require("../code/generators");
const { iterateWithTimeout } = require("../code/iterators");

const letters = roundRobinGenerator(["A", "B", "C"]);

iterateWithTimeout(letters, 5);