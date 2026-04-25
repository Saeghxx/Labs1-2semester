const { roundRobinGenerator, iterateWithTimeout } = require("../code/index.js");

const gen = roundRobinGenerator(["A", "B", "C"]);

iterateWithTimeout(gen, 5, 500);