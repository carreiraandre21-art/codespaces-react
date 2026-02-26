const express = require('express');
const controller = require('../controllers/academicController');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const { absenceSchema, gradeSchema, activitySchema, examSchema, occurrenceSchema } = require('../schemas/eventSchemas');

const router = express.Router();

router.use(auth);

router.post('/absences', role('TEACHER', 'ADMIN'), validate(absenceSchema), controller.createAbsence);
router.post('/grades', role('TEACHER', 'ADMIN'), validate(gradeSchema), controller.createGrade);
router.post('/activities', role('TEACHER'), validate(activitySchema), controller.createActivity);
router.post('/exams', role('TEACHER'), validate(examSchema), controller.createExam);
router.post('/occurrences', role('TEACHER', 'ADMIN'), validate(occurrenceSchema), controller.createOccurrence);

router.get('/students/:studentId/dashboard', role('PARENT', 'STUDENT', 'ADMIN', 'TEACHER'), controller.dashboard);
router.get('/students/:studentId/full', role('PARENT', 'STUDENT', 'ADMIN', 'TEACHER'), controller.studentData);

module.exports = router;
