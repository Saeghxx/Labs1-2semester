# Lab 5: Async Array Variants

## Task Description

Implementation of asynchronous `filter` function using:

* Callback version
* Promise version
* Async usage

Also includes cancellation support via `AbortController`.

---

## Features

* Async processing of array elements
* Error handling (`err-first` callback style)
* Promise chaining support
* Abort/cancel support with cleanup (timers + listeners)

---

## Callback Version

```js
filterCallback(arr, predicate, cb, signal)
```

Uses `(err, result)` callback pattern.

---

## Promise Version

```js
filterPromise(arr, predicate, signal)
```

Returns a Promise with `.then()` / `.catch()` support.

---

## Async/Await Example

```js
const result = await filterPromise(arr, predicate, signal);
```

---

## Abort Support

* Cancels execution via `AbortController`
* Clears timers
* Removes event listeners
* Returns `AbortError`

---

## Demo

Includes demos for:

* Callback
* Promise
* Async
* Abort case

---

## Conclusion

This lab demonstrates differences between callback and Promise-based async programming in JavaScript and proper cancellation handling.

---

## Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute  
Faculty of Informatics and Computer Engineering  
Group: IM-54  
GitHub: @Saeghxx