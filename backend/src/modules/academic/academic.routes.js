const { Router } = require('express');
const auth = require('../../middlewares/auth');
const tenant = require('../../middlewares/tenant');
const authorize = require('../../middlewares/authorize');
const validate = require('../../middlewares/validate');
const controller = require('./academic.controller');

const router = Router();

router.use(auth, tenant);
router.post('/grades', authorize('TEACHER', 'SCHOOL_ADMIN'), validate(controller.createGradeSchema), controller.createGrade);
router.post('/absences', authorize('TEACHER', 'SCHOOL_ADMIN'), validate(controller.createAbsenceSchema), controller.createAbsence);

module.exports = router;
