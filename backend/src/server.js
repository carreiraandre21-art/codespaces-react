const http = require('http');
const crypto = require('crypto');
global.crypto = crypto;
const env = require('./config/env');
const app = require('./app');
const logger = require('./config/logger');
const redis = require('./config/redis');
const createSocket = require('./sockets');

const server = http.createServer(app);
const io = createSocket(server);
app.set('io', io);

const start = async () => {
  try {
    await redis.connect();
  } catch {}

  server.listen(env.port, () => {
    logger.info({ message: `API running on ${env.port}` });
  });
};

start();
