const { Router } = require('express');
const auth = require('../../middlewares/auth');
const tenant = require('../../middlewares/tenant');
const authorize = require('../../middlewares/authorize');
const validate = require('../../middlewares/validate');
const controller = require('./dashboard.controller');

const router = Router();

router.use(auth, tenant);
router.get('/responsavel/:studentId', authorize('PARENT', 'SCHOOL_ADMIN', 'SAAS_ADMIN'), validate(controller.studentIdSchema), controller.responsibleDashboard);
router.get('/aluno/:studentId/historico', authorize('STUDENT', 'PARENT', 'TEACHER', 'SCHOOL_ADMIN', 'SAAS_ADMIN'), validate(controller.studentIdSchema), controller.studentHistory);

module.exports = router;
