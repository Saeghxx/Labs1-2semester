const { roundRobinGenerator, iterateWithTimeout } = require("labop1-2");

const gen = roundRobinGenerator(["A", "B", "C"]);

iterateWithTimeout(gen, 5, 500);