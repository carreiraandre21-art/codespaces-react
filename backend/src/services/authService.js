const AppError = require('../utils/AppError');
const userRepository = require('../repositories/userRepository');
const refreshTokenRepository = require('../repositories/refreshTokenRepository');
const { comparePassword } = require('../utils/hash');
const { signAccessToken, signRefreshToken, verifyRefreshToken, hashToken } = require('../utils/jwt');

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user || !user.active) throw new AppError('Credenciais invalidas', 401, 'INVALID_CREDENTIALS');

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) throw new AppError('Credenciais invalidas', 401, 'INVALID_CREDENTIALS');

  const tokenPayload = { userId: user.id, role: user.role, schoolId: user.schoolId };
  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  await refreshTokenRepository.createRefreshToken({
    schoolId: user.schoolId,
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      schoolId: user.schoolId,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

const refresh = async (rawRefreshToken) => {
  const decoded = verifyRefreshToken(rawRefreshToken);
  const tokenHash = hashToken(rawRefreshToken);
  const stored = await refreshTokenRepository.findRefreshToken(tokenHash);

  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    throw new AppError('Refresh token invalido', 401, 'INVALID_REFRESH_TOKEN');
  }

  const accessToken = signAccessToken({ userId: decoded.userId, role: decoded.role, schoolId: decoded.schoolId });
  return { accessToken };
};

const logout = async (rawRefreshToken) => {
  const tokenHash = hashToken(rawRefreshToken);
  const stored = await refreshTokenRepository.findRefreshToken(tokenHash);
  if (stored && !stored.revokedAt) await refreshTokenRepository.revokeRefreshToken(stored.id);
};

module.exports = { login, refresh, logout };
