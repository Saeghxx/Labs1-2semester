# Laboratory Work 4: Bi-Directional Priority Queue

## Task Description

Implementation of a bi-directional priority queue for storing elements with priorities and retrieving them in different ways.

The goal is to support both priority-based access and insertion-order access.

---

## Implementation

The project contains a `BiPriorityQueue` class that:

* stores elements with assigned priorities
* returns elements with the highest or lowest priority
* supports FIFO access using the oldest inserted element
* supports LIFO access using the newest inserted element

Each element is stored with:

* `value`
* `priority`
* `order`

The `order` field is used to preserve insertion order when priorities are equal.

---

## Supported Operations

### `enqueue(value, priority)`

Adds a new element with a priority.

### `peek(mode)`

Returns an element without removing it.

Modes:

* `highest`
* `lowest`
* `oldest`
* `newest`

### `dequeue(mode)`

Removes and returns an element.

Modes:

* `highest`
* `lowest`
* `oldest`
* `newest`

---


## Conclusion

This laboratory work demonstrates the implementation of a bi-directional priority queue in JavaScript.

The structure combines priority queue behavior with FIFO and LIFO access, making it flexible and efficient for different tasks.

---

## Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute  
Faculty of Informatics and Computer Engineering  
Group: IM-54  
GitHub: @Saeghxx
