# Laboratory Work 3: Memoization and Cache Management

## Task Description

Implementation of a memoization function for pure functions with cache storage and configurable eviction strategies.

The goal is to improve performance by avoiding redundant computations and managing cache efficiently.

---

## Implementation

The project contains a `memoize` function that:

* caches function results based on input arguments
* returns cached values for repeated calls
* supports configurable cache size and eviction policies

Cache keys are generated using `JSON.stringify(arguments)`.

---

## Cache Eviction Strategies

* **LRU (Least Recently Used)** – removes the least recently used entries
* **LFU (Least Frequently Used)** – removes the least frequently accessed entries
* **TTL (Time-Based Expiry)** – removes cached entries after a configurable time limit
* **Custom Policy** – allows users to define their own eviction logic

---

## Performance

The cache automatically removes unnecessary entries when the size limit is reached, helping prevent excessive memory consumption and improving efficiency.

---

## Usage

A memoized function is created by wrapping a pure function using `memoize()`.

After that, the function can be called normally, and repeated calls with the same arguments return cached results instead of recalculating them.

This significantly improves performance for expensive or frequently repeated operations.

---

## Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute  
Faculty of Informatics and Computer Engineering  
Group: IM-54  
GitHub: @Saeghxx
