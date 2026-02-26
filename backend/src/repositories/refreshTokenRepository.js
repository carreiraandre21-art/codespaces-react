const prisma = require('../config/prisma');

const createRefreshToken = (data) => prisma.refreshToken.create({ data });
const findRefreshToken = (tokenHash) => prisma.refreshToken.findUnique({ where: { tokenHash } });
const revokeRefreshToken = (id) => prisma.refreshToken.update({ where: { id }, data: { revokedAt: new Date() } });

module.exports = { createRefreshToken, findRefreshToken, revokeRefreshToken };
