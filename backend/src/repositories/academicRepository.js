const prisma = require('../config/prisma');

const listStudentData = ({ schoolId, studentId }) =>
  prisma.student.findFirst({
    where: { id: studentId, schoolId },
    include: {
      user: true,
      class: true,
      grades: { include: { subject: true, exam: true }, orderBy: { createdAt: 'desc' } },
      absences: { include: { subject: true }, orderBy: { date: 'desc' } },
      occurrences: { orderBy: { createdAt: 'desc' } }
    }
  });

module.exports = { listStudentData };
