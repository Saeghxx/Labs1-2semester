const a = array();
const arr = array ();

arr.push('first');
arr.push('second');
arr.push('third');

console.log(arr(0)); // Виводить: first
console.log(arr(1)); // Виводить: second
console.log(arr(2)); // Виводить: third

console.log(arr.pop()); // Виводить: third
console.log(arr.pop()); // Виводить: second
console.log(arr.pop()); // Виводить: first

console.log(arr.pop()); // Виводить: undefined

function array() {
  const arr = [];
  function access(index) {
    return arr[index]; 
  }
  access.push = function(value) {
    arr.push(value);
  };

  access.pop = function() {
    return arr.pop();
  };

    return access;
}