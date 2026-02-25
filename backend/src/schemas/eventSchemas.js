const { z } = require('zod');

const absenceSchema = z.object({
  studentId: z.number().int().positive(),
  subjectId: z.number().int().positive(),
  date: z.string().datetime(),
  reason: z.string().optional()
});

const gradeSchema = z.object({
  studentId: z.number().int().positive(),
  subjectId: z.number().int().positive(),
  examId: z.number().int().positive().optional(),
  value: z.number().min(0).max(10),
  term: z.string().min(1)
});

const activitySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  dueDate: z.string().datetime(),
  classId: z.number().int().positive(),
  subjectId: z.number().int().positive()
});

const examSchema = z.object({
  title: z.string().min(3),
  date: z.string().datetime(),
  classId: z.number().int().positive(),
  subjectId: z.number().int().positive(),
  description: z.string().optional()
});

const occurrenceSchema = z.object({
  studentId: z.number().int().positive(),
  type: z.enum(['ADVERTENCIA', 'SUSPENSAO', 'COMUNICADO']),
  description: z.string().min(3)
});

module.exports = { absenceSchema, gradeSchema, activitySchema, examSchema, occurrenceSchema };
