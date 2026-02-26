const { z } = require('zod');
const asyncHandler = require('../../utils/asyncHandler');
const academicService = require('../../services/academicService');
const auditService = require('../../services/auditService');

const createGradeSchema = z.object({
  body: z.object({
    studentId: z.string().uuid(),
    subjectId: z.string().uuid(),
    examId: z.string().uuid().optional(),
    value: z.number().min(0).max(10),
    term: z.string().min(1)
  })
});

const createAbsenceSchema = z.object({
  body: z.object({
    studentId: z.string().uuid(),
    subjectId: z.string().uuid(),
    date: z.string().datetime(),
    reason: z.string().optional()
  })
});

const createGrade = asyncHandler(async (req, res) => {
  const data = await academicService.createGrade({ schoolId: req.schoolId, userId: req.auth.userId, payload: req.body });
  await auditService.registerAudit({ schoolId: req.schoolId, userId: req.auth.userId, action: 'CREATE_GRADE', module: 'ACADEMIC', metadata: { id: data.id } });
  req.app.get('io').to(`school:${req.schoolId}`).emit('grade:new', data);
  res.status(201).json(data);
});

const createAbsence = asyncHandler(async (req, res) => {
  const data = await academicService.createAbsence({ schoolId: req.schoolId, userId: req.auth.userId, payload: req.body });
  await auditService.registerAudit({ schoolId: req.schoolId, userId: req.auth.userId, action: 'CREATE_ABSENCE', module: 'ACADEMIC', metadata: { id: data.id } });
  req.app.get('io').to(`school:${req.schoolId}`).emit('absence:new', data);
  res.status(201).json(data);
});

module.exports = { createGrade, createAbsence, createGradeSchema, createAbsenceSchema };
