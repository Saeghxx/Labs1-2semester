const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    ERROR: 2,
};

function isPromise(value) {
    return value && typeof value.then === "function";
}

export function log({ level = "INFO", logger, errorsOnly = false, formatter } = {}) {
    const minLevel = LOG_LEVELS[level];

    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;

        descriptor.value = function (...args) {
            const timestamp = new Date().toISOString();
            const start = Date.now();

            const baseLog = {
                method: propertyKey,
                timestamp,
                args,
            };

            const shouldLog = (lvl) => LOG_LEVELS[lvl] >= minLevel;

            const emit = (lvl, data) => {
                if (shouldLog(lvl)) {
                    logger.log(lvl, formatter ? formatter(data) : data);
                }
            };

            try {
                const result = original.apply(this, args);

                if (isPromise(result)) {
                    return result
                        .then((res) => {
                            const time = Date.now() - start;

                            if (!errorsOnly) {
                                emit("INFO", {
                                    ...baseLog,
                                    result: res,
                                    executionTimeMs: time,
                                    event: "success",
                                });
                            }

                            return res;
                        })
                        .catch((err) => {
                            const time = Date.now() - start;

                            logger.log("ERROR", {
                                ...baseLog,
                                message: err.message,
                                executionTimeMs: time,
                                event: "error",
                            });

                            throw err;
                        });
                }

                const time = Date.now() - start;

                if (!errorsOnly) {
                    emit("INFO", {
                        ...baseLog,
                        result,
                        executionTimeMs: time,
                        event: "success",
                    });
                }

                return result;

            } catch (err) {
                const time = Date.now() - start;

                logger.log("ERROR", {
                    ...baseLog,
                    message: err.message,
                    executionTimeMs: time,
                    event: "error",
                });

                throw err;
            }
        };

        return descriptor;
    };
}