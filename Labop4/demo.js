const BiPriorityQueue = require("./queue");

const battleQueue = new BiPriorityQueue();

battleQueue.enqueue("Battle of Waterloo", 10);
battleQueue.enqueue("Battle of Stalingrad", 10);
battleQueue.enqueue("Battle of Hastings", 9);
battleQueue.enqueue("Battle of Thermopylae", 8);
battleQueue.enqueue("Battle of Gettysburg", 7);

console.log("Highest priority:", battleQueue.peek("highest"));
console.log("Lowest priority:", battleQueue.peek("lowest"));
console.log("Oldest:", battleQueue.peek("oldest"));
console.log("Newest:", battleQueue.peek("newest"));

console.log("\nDequeue highest:");
console.log(battleQueue.dequeue("highest"));
console.log(battleQueue.dequeue("highest"));

console.log("\nFIFO:");
console.log(battleQueue.dequeue("oldest"));

console.log("\nLIFO:");
console.log(battleQueue.dequeue("newest"));