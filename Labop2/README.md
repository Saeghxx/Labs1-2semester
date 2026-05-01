<<<<<<< HEAD
````md
=======
>>>>>>> b7923e64db9f5d7ac75c57aacf6c09e94b9056f9
# labop2

Library for working with generators and iterators.

This project is part of Laboratory Work №2 and focuses on project structure, local dependency management, and library modularization for JavaScript generators and iterators.

## Installation

```bash
npm install
````

## Usage

```js
const { roundRobinGenerator, iterateWithTimeout } = require("labop1-2");

const gen = roundRobinGenerator(["A", "B", "C"]);
iterateWithTimeout(gen, 5, 500);
```

## Updates (v1.1.0)

* Refactored project structure and separated code into modules
* Added local dependency connection through `examples/`
* Fixed module resolution and `package.json` scripts
* Added `.gitignore` and MIT License


## Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute
Faculty of Informatics and Computer Engineering
Group: IM-54
GitHub: @Saeghxx
