import { log } from "../decorators/log.js";

export class MathService {

    @log({ level: "INFO", logger: console })
    add(a, b) {
        return a + b;
    }

    @log({ level: "DEBUG", logger: console })
    multiply(x, y) {
        return x * y;
    }

    @log({ level: "INFO", logger: console })
    power(base, exponent) {
        return base ** exponent;
    }
}