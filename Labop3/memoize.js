// Lab 3
function memoize(fn, options = {}) {
    const cache = new Map();

    const maxSize = options.maxSize || Infinity;
    const ttl = options.ttl || 0;
    const customEvict = options.customEvict;

    // LRU remove
    function evictLRU() {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
    }

    // LFU remove
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

    // choose eviction strategy
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

            // TTL check
            if (ttl > 0 && Date.now() - entry.timestamp >= ttl) {
                cache.delete(key);
            } else {
                // refresh for LRU
                cache.delete(key);
                cache.set(key, entry);

                entry.timestamp = Date.now();
                entry.count += 1;

                return entry.value;
            }
        }

        // execute original function
        const result = fn(...args);

        cache.set(key, {
            value: result,
            timestamp: Date.now(),
            count: 1
        });

        evict();

        // custom eviction
        if (
            options.eviction === "custom" &&
            typeof customEvict === "function"
        ) {
            const keyToRemove = customEvict(cache);
            cache.delete(keyToRemove);
        }

        return result;
    };
}

module.exports = memoize;