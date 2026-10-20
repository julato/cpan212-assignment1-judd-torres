// an in-memory cache where each entry expires after a set time.store a value

export function createCache(ttlSeconds) {

    const cache = new Map() // Map with { value, expiresAt } entries works well.


    let hits = 0; let misses = 0;   //It needs a way to get a value (counting a hit or a miss),

    return {
        get(key) {
            const entry = cache.get(key);

            if (!entry) {
                misses++;
                return undefined;
            }

            if (entry.expiresAt > Date.now()) {
                hits++
                return entry.value;
            }

            cache.delete(key)
            misses++;
            return undefined;


        },

        set(key, value) {
            const expiresAt = Date.now() + ttlSeconds * 1000;

            cache.set(key, {
                value: value,
                expiresAt : expiresAt
            })
        },

        getStats() {

            for (const [key, entry] of cache) {
                if (Date.now() >= entry.expiresAt) {
                    cache.delete(key);
                }
            }
                    //report { entries, hits, misses, ttlSeconds }.
            return {
                entries: cache.size,
                hits: hits,
                misses: misses,
                ttlSeconds: ttlSeconds
            }
        }




    }
}