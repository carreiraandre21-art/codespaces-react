const { z } = require('zod');
const asyncHandler = require('../../utils/asyncHandler');
const authService = require('../../services/authService');
const auditService = require('../../services/auditService');

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

const refreshSchema = z.object({ body: z.object({ refreshToken: z.string().min(10) }) });

const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  await auditService.registerAudit({
    schoolId: data.user.schoolId,
    userId: data.user.id,
    action: 'LOGIN',
    module: 'AUTH',
    ipAddress: req.ip,
    userAgent: req.headers['user-agent']
  });
  res.json(data);
});

const refresh = asyncHandler(async (req, res) => {
  const data = await authService.refresh(req.body.refreshToken);
  res.json(data);
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(204).send();
});

module.exports = { login, refresh, logout, loginSchema, refreshSchema };
