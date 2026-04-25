function memoize(fn, options = {}) {
    const cache = new Map();

    const maxSize = options.maxSize || Infinity;
    const eviction = options.eviction || "LRU";
    const ttl = options.ttl || 0;
    const customEvict = options.customEvict;

    function evictCache() {
        if (cache.size <= maxSize) return;

        if (eviction === "LRU") {
            const oldestKey = cache.keys().next().value;
            cache.delete(oldestKey);
        }

        else if (eviction === "LFU") {
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

        else if (eviction === "TTL") {
            const now = Date.now();

            for (const [key, entry] of cache.entries()) {
                if (now - entry.timestamp >= ttl) {
                    cache.delete(key);
                }
            }

            if (cache.size > maxSize) {
                const oldestKey = cache.keys().next().value;
                cache.delete(oldestKey);
            }
        }

        else if (
            eviction === "custom" &&
            typeof customEvict === "function"
        ) {
            const keyToRemove = customEvict(cache);

            if (cache.has(keyToRemove)) {
                cache.delete(keyToRemove);
            }
        }
    }

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key) && eviction === "TTL") {
            const entry = cache.get(key);

            if (Date.now() - entry.timestamp >= ttl) {
                cache.delete(key);
            }
        }

        if (cache.has(key)) {
            const entry = cache.get(key);

            entry.timestamp = Date.now();
            entry.count += 1;

            if (eviction === "LRU") {
                cache.delete(key);
                cache.set(key, entry);
            }

            return entry.value;
        }

        const result = fn(...args);

        cache.set(key, {
            value: result,
            timestamp: Date.now(),
            count: 1
        });

        evictCache();

        return result;
    };
}

module.exports = memoize;