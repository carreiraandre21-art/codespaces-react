const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany();
  await prisma.occurrence.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.absence.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.class.deleteMany();
  await prisma.user.deleteMany();

  const hash = await bcrypt.hash('123456', 10);

  const admin = await prisma.user.create({ data: { name: 'Admin', email: 'admin@conectaescola.com', password: hash, role: 'ADMIN' } });
  const teacherUser = await prisma.user.create({ data: { name: 'Prof. Ana', email: 'ana@conectaescola.com', password: hash, role: 'TEACHER' } });
  const teacher = await prisma.teacher.create({ data: { userId: teacherUser.id } });

  const classA = await prisma.class.create({ data: { name: '7º Ano A', year: 2026 } });
  const math = await prisma.subject.create({ data: { name: 'Matemática', classId: classA.id, teacherId: teacher.id } });

  const parentUser = await prisma.user.create({ data: { name: 'Carlos Souza', email: 'carlos@email.com', password: hash, role: 'PARENT' } });
  const parent = await prisma.parent.create({ data: { userId: parentUser.id, phone: '11999998888' } });

  const studentUser = await prisma.user.create({ data: { name: 'Marina Souza', email: 'marina@email.com', password: hash, role: 'STUDENT' } });
  const student = await prisma.student.create({
    data: {
      userId: studentUser.id,
      parentId: parent.id,
      classId: classA.id,
      registration: '2026001',
      birthDate: new Date('2013-03-20')
    }
  });

  const exam = await prisma.exam.create({ data: { title: 'Prova Bimestral', date: new Date(Date.now() + 7 * 24 * 3600000), classId: classA.id, subjectId: math.id, teacherId: teacher.id } });

  await prisma.grade.create({ data: { studentId: student.id, subjectId: math.id, teacherId: teacher.id, examId: exam.id, value: 8.7, term: '1º Bimestre' } });
  await prisma.absence.create({ data: { studentId: student.id, subjectId: math.id, teacherId: teacher.id, date: new Date(), reason: 'Consulta médica' } });
  await prisma.activity.create({ data: { title: 'Lista de exercícios', description: 'Resolver pág. 10-12', dueDate: new Date(Date.now() + 3 * 24 * 3600000), classId: classA.id, subjectId: math.id, teacherId: teacher.id } });
  await prisma.occurrence.create({ data: { studentId: student.id, type: 'COMUNICADO', description: 'Bom desempenho em sala', createdById: admin.id } });

  console.log('Seed concluído com sucesso');
}

main().finally(() => prisma.$disconnect());
