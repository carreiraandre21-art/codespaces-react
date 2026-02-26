const prisma = require('../config/prisma');

const getDashboard = async (schoolId, studentId) => {
  const [grades, absences, exams, activities, occurrences] = await Promise.all([
    prisma.grade.findMany({ where: { schoolId, studentId }, include: { subject: true } }),
    prisma.absence.findMany({ where: { schoolId, studentId, date: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } }),
    prisma.exam.findMany({ where: { schoolId, class: { students: { some: { id: studentId } } }, date: { gte: new Date() } }, include: { subject: true }, take: 5, orderBy: { date: 'asc' } }),
    prisma.activity.findMany({ where: { schoolId, class: { students: { some: { id: studentId } } }, status: 'PENDING' }, take: 10, orderBy: { dueDate: 'asc' } }),
    prisma.occurrence.findMany({ where: { schoolId, studentId }, take: 5, orderBy: { createdAt: 'desc' } })
  ]);

  return { grades, absences, exams, activities, occurrences };
};

module.exports = { getDashboard };
