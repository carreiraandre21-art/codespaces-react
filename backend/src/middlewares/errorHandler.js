const logger = require('../config/logger');

module.exports = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  logger.error({
    message: error.message,
    stack: error.stack,
    statusCode,
    code: error.code || 'UNEXPECTED_ERROR'
  });

  res.status(statusCode).json({
    message: error.message || 'Erro interno',
    code: error.code || 'UNEXPECTED_ERROR'
  });
};
