const memoize = require("../code/memoize");

const greetUser = (name) => {

    console.log("Generating greeting...");
    return "Hello " + name;

};

const memoGreeting = memoize(greetUser, {

    maxSize: 3,
    eviction: "LRU"
});

console.log(memoGreeting("Jake"));
console.log(memoGreeting("Daniel"));
console.log(memoGreeting("Jake")); 
console.log(memoGreeting("Samuel"));
console.log(memoGreeting("Changsu"));