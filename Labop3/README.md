# Laboratory Work 3: Memoization and Cache Management

## Task Description

Implementation of a memoization function for pure functions with cache storage and configurable eviction strategies.

The goal is to improve performance by avoiding redundant computations and managing cache efficiently.

---

## Implementation

The project contains a `memoize` function that:

* caches function results based on input arguments
* returns cached values for повторні виклики
* supports configurable cache size

Cache key is created using `JSON.stringify(arguments)`.

---

## Cache Eviction Strategies

* **LRU (Least Recently Used)** – removes the oldest unused entries
* **LFU (Least Frequently Used)** – removes least accessed entries
* **TTL (Time-Based Expiry)** – removes expired entries based on time
* **Custom Policy** – user-defined eviction function

---

## Performance

Cache automatically prunes entries when limit is reached to prevent excessive memory usage.

---

## Usage

The memoized function is created by wrapping a pure function using memoize(). After that, it can be called normally, and repeated calls with the same arguments return cached results instead of recalculating them.

---

## Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute (KPI)  
Faculty of Informatics and Computer Engineering (FICE)
Group: IM-54
GitHub: @Saeghxx