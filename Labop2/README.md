# labop1-2

Library for working with generators and iterators.

## Installation

```bash
npm install
```

## Usage

```js
const { roundRobinGenerator, iterateWithTimeout } = require("labop1-2");

const gen = roundRobinGenerator(["A", "B", "C"]);
iterateWithTimeout(gen, 5);
```
## Updates (v1.1.0)
- **Refactored project structure**: Standardized folder naming (moved to `examples/`).
- **Dependency fixes**: Corrected module resolution paths in `demo.js`.
- **NPM Integration**: Added and verified `start` scripts in `package.json`.

## Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute (KPI)  
Faculty of Informatics and Computer Engineering (FICE)
Group: IM-54
GitHub: @Saeghxx