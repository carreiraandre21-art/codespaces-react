const prisma = require('../config/prisma');
const { notifyParentByStudent } = require('./notificationService');

const createAbsence = async (teacherId, payload) => {
  const absence = await prisma.absence.create({
    data: { ...payload, teacherId, date: new Date(payload.date) }
  });
  await notifyParentByStudent(payload.studentId, 'Nova falta registrada', 'Uma falta foi registrada para o aluno.', 'ABSENCE');
  return absence;
};

const createGrade = async (teacherId, payload) => {
  const grade = await prisma.grade.create({ data: { ...payload, teacherId } });
  await notifyParentByStudent(payload.studentId, 'Nova nota lançada', `Nota ${payload.value} foi lançada.`, 'GRADE');
  return grade;
};

const createActivity = async (teacherId, payload) => {
  return prisma.activity.create({
    data: { ...payload, teacherId, dueDate: new Date(payload.dueDate) }
  });
};

const createExam = async (teacherId, payload) => {
  return prisma.exam.create({
    data: { ...payload, teacherId, date: new Date(payload.date) }
  });
};

const createOccurrence = async (createdById, payload) => {
  const occurrence = await prisma.occurrence.create({
    data: { ...payload, createdById }
  });
  await notifyParentByStudent(payload.studentId, 'Nova ocorrência', `${payload.type} registrada para o aluno.`, 'OCCURRENCE');
  return occurrence;
};

const getStudentSummary = async (studentId) => {
  const [absencesMonth, grades, upcomingExams, pendingActivities] = await Promise.all([
    prisma.absence.count({ where: { studentId, date: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } }),
    prisma.grade.findMany({ where: { studentId } }),
    prisma.exam.findMany({ where: { class: { students: { some: { id: studentId } } }, date: { gte: new Date() } }, take: 5, orderBy: { date: 'asc' } }),
    prisma.activity.findMany({ where: { class: { students: { some: { id: studentId } } }, status: 'PENDING' }, take: 10, orderBy: { dueDate: 'asc' } })
  ]);

  const avg = grades.length ? grades.reduce((acc, g) => acc + g.value, 0) / grades.length : 0;

  return {
    faltasMes: absencesMonth,
    mediaGeral: Number(avg.toFixed(2)),
    proximasProvas: upcomingExams,
    atividadesPendentes: pendingActivities
  };
};

const listByStudent = async (studentId) => {
  const [grades, absences, activities, exams, occurrences] = await Promise.all([
    prisma.grade.findMany({ where: { studentId }, include: { subject: true, exam: true } }),
    prisma.absence.findMany({ where: { studentId }, include: { subject: true } }),
    prisma.activity.findMany({ where: { class: { students: { some: { id: studentId } } } } }),
    prisma.exam.findMany({ where: { class: { students: { some: { id: studentId } } } }, include: { subject: true } }),
    prisma.occurrence.findMany({ where: { studentId } })
  ]);
  return { grades, absences, activities, exams, occurrences };
};

module.exports = {
  createAbsence,
  createGrade,
  createActivity,
  createExam,
  createOccurrence,
  getStudentSummary,
  listByStudent
};
