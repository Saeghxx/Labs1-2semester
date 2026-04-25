function memoize(fn, options = {}) {
    const cache = new Map();

    const maxSize = options.maxSize || Infinity;

    function evictLRU() {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
    }

    function evictLFU() {
        let leastKey;
        let leastCount = Infinity;

        for (const [key, entry] of cache.entries()) {
            if (entry.count < leastCount) {
                leastCount = entry.count;
                leastKey = key;
            }
        }

        cache.delete(leastKey);
    }

    function evict() {
        if (cache.size <= maxSize) return;

        if (options.eviction === "LFU") {
            evictLFU();
        } else {
            evictLRU();
        }
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

        evict();

        return result;
    };
}

module.exports = memoize;