const Redis = require('ioredis');
const env = require('./env');

const redis = new Redis(env.redisUrl, {
  maxRetriesPerRequest: 2,
  lazyConnect: true
});

redis.on('error', () => {});

module.exports = redis;
