const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
  corsOrigin: (process.env.CORS_ORIGIN || '*').split(','),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'change_me_access',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change_me_refresh',
  jwtAccessTtl: process.env.JWT_ACCESS_TTL || '15m',
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL || '7d',
  logLevel: process.env.LOG_LEVEL || 'info'
};
