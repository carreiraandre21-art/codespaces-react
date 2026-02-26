const { Router } = require('express');
const prisma = require('./config/prisma');
const authRoutes = require('./modules/auth/auth.routes');
const schoolRoutes = require('./modules/schools/schools.routes');
const dashboardRoutes = require('./modules/dashboard/dashboard.routes');
const academicRoutes = require('./modules/academic/academic.routes');

const router = Router();

router.get('/health', async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ ok: true, service: 'conectaescola-api-enterprise' });
});

router.use('/auth', authRoutes);
router.use('/schools', schoolRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/academic', academicRoutes);

module.exports = router;
