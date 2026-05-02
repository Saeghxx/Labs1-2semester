import fs from "fs";

export class FileLogger {
    constructor(filePath = "logs.txt") {
        this.filePath = filePath;
    }

    log(level, data) {
        fs.appendFileSync(
            this.filePath,
            `[${level}] ${JSON.stringify(data)}\n`
        );
    }
}