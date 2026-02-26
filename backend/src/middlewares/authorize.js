const AppError = require('../utils/AppError');

module.exports = (...roles) => (req, _res, next) => {
  if (!req.auth || !roles.includes(req.auth.role)) {
    throw new AppError('Acesso negado', 403, 'FORBIDDEN');
  }
  next();
};
