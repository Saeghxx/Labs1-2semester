export const jsonFormatter = (log) => ({
    timestamp: log.timestamp,
    method: log.method,
    args: log.args,
    result: log.result,
    executionTimeMs: log.executionTimeMs
});