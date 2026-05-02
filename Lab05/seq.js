function seq(fn) { //fn перша функція 
  const functions = [fn]; 

  function chain(next) {
    if (typeof next === "number") {
      return functions.reduceRight((result, f) => f(result), next); //reduceRight починає з кінця масиву отже остання додана функція застосовується першою.
    } else if (typeof next === "function") {
      functions.push(next);
      return chain;
    }
  }

  return chain;
}

console.log(seq((x) => x + 7)((x) => x * 2)(5));
console.log(seq((x) => x * 2)((x) => x + 7)(5));
console.log(seq((x) => x + 1)((x) => x * 2)((x) => x / 3)((x) => x - 4)(7));
console.log(seq((x) => x * x)((x) => x + 1)(2));
console.log(seq((x) => x - 3)((x) => x * 4)((x) => x + 2)(8));