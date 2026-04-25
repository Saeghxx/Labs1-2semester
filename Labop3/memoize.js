function memoize(fn, options = {}) {
    const cache = new Map();

    const maxSize = options.maxSize || Infinity;

    function evictLRU() {
        if (cache.size <= maxSize) return;

        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
    }

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            const entry = cache.get(key);

            cache.delete(key);
            cache.set(key, entry);

            entry.timestamp = Date.now();
            entry.count += 1;

            return entry.value;
        }

        const result = fn(...args);

        cache.set(key, {
            value: result,
            timestamp: Date.now(),
            count: 1
        });

        evictLRU();

        return result;
    };
}

module.exports = memoize;