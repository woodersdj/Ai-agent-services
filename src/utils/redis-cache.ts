import Redis from "ioredis";

let client: Redis | null = null;

export function getRedisClient(): Redis {
  if (client) return client;
  const url = process.env.REDIS_URL || "redis://localhost:6379";
  client = new Redis(url, { connectTimeout: 5000, maxRetriesPerRequest: 3 });
  client.on("error", (err) => console.error("Redis error:", err));
  return client;
}

export async function cacheGet(key: string) {
  const c = getRedisClient();
  const v = await c.get(key);
  return v ? JSON.parse(v) : null;
}

export async function cacheSet(key: string, value: any, ttlSec = 60) {
  const c = getRedisClient();
  await c.set(key, JSON.stringify(value), "EX", ttlSec);
}
