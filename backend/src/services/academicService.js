const AppError = require('../utils/AppError');
const prisma = require('../config/prisma');

const ensureTeacherId = async ({ schoolId, userId }) => {
  const teacher = await prisma.teacher.findFirst({ where: { schoolId, userId } });
  if (!teacher) throw new AppError('Professor nao encontrado para este usuario', 400, 'TEACHER_NOT_FOUND');
  return teacher.id;
};

const createGrade = async ({ schoolId, userId, payload }) => {
  const teacherId = await ensureTeacherId({ schoolId, userId });
  return prisma.grade.create({ data: { ...payload, schoolId, teacherId } });
};

const createAbsence = async ({ schoolId, userId, payload }) => {
  const teacherId = await ensureTeacherId({ schoolId, userId });
  return prisma.absence.create({ data: { ...payload, schoolId, teacherId, date: new Date(payload.date) } });
};

module.exports = { createGrade, createAbsence };
