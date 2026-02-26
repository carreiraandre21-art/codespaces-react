const { verifyAccessToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');

module.exports = (req, _res, next) => {
  const auth = req.headers.authorization;
  if (!auth) throw new AppError('Token nao informado', 401, 'UNAUTHORIZED');
  const [, token] = auth.split(' ');
  if (!token) throw new AppError('Token invalido', 401, 'UNAUTHORIZED');

  const decoded = verifyAccessToken(token);
  req.auth = decoded;
  next();
};
