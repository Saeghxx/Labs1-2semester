# Lab 7: Reactive Communication with EventEmitter

## Task Description

This lab implements reactive message-based communication using a custom `EventEmitter` in JavaScript.

The project demonstrates communication between independent system components through events using the Publisher / Subscriber (Pub/Sub) pattern.

Main requirements:

- subscribe / unsubscribe support
- multiple listeners for one event
- safe execution using `try/catch` inside `emit()`
- separate `error` channel for handling listener failures

---

## Features

- Event-based communication between entities
- Multiple independent listeners
- Error isolation inside `emit()`
- Dedicated `error` event
- Fallback with `console.error()` if no error listener exists

---

## Demo

The demo includes:

- event subscription
- event emission
- unsubscribe functionality
- broken listener handling
- error channel processing

---

## Conclusion

This lab shows how EventEmitter helps build scalable and fault-tolerant systems using reactive communication and the Pub/Sub pattern.

---

## Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute  
Faculty of Informatics and Computer Engineering  
Group: IM-54  
GitHub: @Saeghxx
