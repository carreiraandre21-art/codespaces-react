const redis = require('../config/redis');

const getCache = async (key) => {
  try {
    return await redis.get(key);
  } catch {
    return null;
  }
};

const setCache = async (key, value, ttlSeconds = 120) => {
  try {
    await redis.set(key, value, 'EX', ttlSeconds);
  } catch {}
};

const delCache = async (key) => {
  try {
    await redis.del(key);
  } catch {}
};

module.exports = { getCache, setCache, delCache };
