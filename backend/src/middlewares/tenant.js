const AppError = require('../utils/AppError');

module.exports = (req, _res, next) => {
  if (req.auth?.role === 'SAAS_ADMIN') return next();
  if (!req.auth?.schoolId) throw new AppError('Tenant nao informado', 400, 'TENANT_REQUIRED');
  req.schoolId = req.auth.schoolId;
  next();
};
