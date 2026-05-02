export class ConsoleLogger {
    log(level, data) {
        console.log(`[${level}]`, JSON.stringify(data, null, 2));
    }
}