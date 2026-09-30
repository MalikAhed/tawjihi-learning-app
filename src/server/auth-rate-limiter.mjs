const DEFAULT_POLICIES = Object.freeze({
  review:Object.freeze({limit:10,windowMs:60_000}),
  trialReview:Object.freeze({limit:3,windowMs:60_000}),
  availability:Object.freeze({ limit:30, windowMs:60_000 }),
  register:Object.freeze({ limit:8, windowMs:60 * 60_000 }),
  signIn:Object.freeze({ limit:10, windowMs:10 * 60_000 }),
});

export function createAuthRateLimiter({ now = Date.now } = {}) {
  const buckets = new Map();
  let requestCount = 0;

  const removeExpiredBuckets = (currentTime) => {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= currentTime) buckets.delete(key);
    }
  };

  return Object.freeze({
    consume(key, policyName) {
      const policy = DEFAULT_POLICIES[policyName];
      if (!policy) throw new RangeError(`Unknown authentication rate-limit policy: ${policyName}`);
      const currentTime = now();
      requestCount += 1;
      if (requestCount % 100 === 0) removeExpiredBuckets(currentTime);
      const existing = buckets.get(key);
      if (!existing && buckets.size >= 10000) { removeExpiredBuckets(currentTime); if (buckets.size >= 10000) return {allowed:false,retryAfterSeconds:60}; }
      const bucket = !existing || existing.resetAt <= currentTime
        ? { count:0, resetAt:currentTime + policy.windowMs }
        : existing;
      bucket.count += 1;
      buckets.set(key, bucket);
      return {
        allowed:bucket.count <= policy.limit,
        retryAfterSeconds:Math.max(1, Math.ceil((bucket.resetAt - currentTime) / 1_000)),
      };
    },
    reset(key) { buckets.delete(key); },
  });
}
