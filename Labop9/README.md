# Laboratory Work 9: Logging Decorator

## Task Description

Implementation of a decorator-based logging system for functions and class methods with configurable log levels.

The goal is to log function input arguments and return values using a reusable decorator that supports Dependency Injection.

---

## Implementation

The project contains a `log` decorator that:

- wraps functions and class methods
- logs input arguments and return values
- supports sync and async functions
- uses external logger (Dependency Injection principle)

Each log entry contains:

- method name
- timestamp (ISO 8601 format)
- arguments
- result or error message
- execution time in milliseconds
- event status (success / error)

---

## Log Levels

Supported log levels:

- `INFO` – logs inputs and outputs
- `DEBUG` – detailed execution logging
- `ERROR` – logs only exceptions

Example usage:

- `@log({ level: "INFO" })`
- `@log({ level: "ERROR", errorsOnly: true })`

---

## Features

 Dependency Injection (console / file / external logger)  
 Sync and Async support  
 ISO 8601 timestamps  
 Conditional logging (errors only mode)  
 Execution time profiling  
 Structured logging (JSON format)

---

## Example

```js
@log({ level: "INFO" })
class MathService {
    add(a, b) {
        return a + b;
    }
}
````

---

## Output Example

```text id="lab9_output"
INFO {
  method: "add",
  timestamp: "2026-05-02T10:43:56.665Z",
  args: [2, 3],
  result: 5,
  executionTimeMs: 1,
  event: "success"
}
```

---

## Conclusion

This laboratory work demonstrates a flexible logging system using the decorator pattern with Dependency Injection and support for async functions.

---

## Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute  
Faculty of Informatics and Computer Engineering  
Group: IM-54  
GitHub: @Saeghxx
