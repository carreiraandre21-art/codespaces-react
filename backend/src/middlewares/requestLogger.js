const logger = require('../config/logger');

module.exports = (req, _res, next) => {
  logger.info({ message: 'request', method: req.method, path: req.path, ip: req.ip });
  next();
};
