const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.refreshToken.deleteMany();
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
  await prisma.school.deleteMany();

  const hash = await bcrypt.hash('123456', 12);

  const school = await prisma.school.create({
    data: {
      name: 'Escola Jean Piaget',
      cnpj: '12345678000190',
      plan: 'PRO',
      active: true
    }
  });

  const saasAdmin = await prisma.user.create({
    data: {
      name: 'Admin SaaS',
      email: 'owner@conectaescola.com',
      passwordHash: hash,
      role: 'SAAS_ADMIN'
    }
  });

  const schoolAdmin = await prisma.user.create({
    data: {
      schoolId: school.id,
      name: 'Admin Escola',
      email: 'admin@conectaescola.com',
      passwordHash: hash,
      role: 'SCHOOL_ADMIN'
    }
  });

  const teacherUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      name: 'Ana Professor',
      email: 'ana@conectaescola.com',
      passwordHash: hash,
      role: 'TEACHER'
    }
  });

  const parentUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      name: 'Carlos Responsavel',
      email: 'carlos@email.com',
      passwordHash: hash,
      role: 'PARENT'
    }
  });

  const studentUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      name: 'Marina Aluna',
      email: 'marina@email.com',
      passwordHash: hash,
      role: 'STUDENT'
    }
  });

  const teacher = await prisma.teacher.create({
    data: { schoolId: school.id, userId: teacherUser.id }
  });

  const parent = await prisma.parent.create({
    data: { schoolId: school.id, userId: parentUser.id, phone: '11999998888' }
  });

  const classA = await prisma.class.create({
    data: { schoolId: school.id, name: '7 Ano A', year: 2026 }
  });

  const student = await prisma.student.create({
    data: {
      schoolId: school.id,
      userId: studentUser.id,
      parentId: parent.id,
      classId: classA.id,
      registration: '2026001',
      birthDate: new Date('2013-03-20')
    }
  });

  const subject = await prisma.subject.create({
    data: {
      schoolId: school.id,
      name: 'Matematica',
      classId: classA.id,
      teacherId: teacher.id
    }
  });

  const exam = await prisma.exam.create({
    data: {
      schoolId: school.id,
      title: 'Prova Bimestral',
      date: new Date(Date.now() + 7 * 86400000),
      classId: classA.id,
      subjectId: subject.id,
      teacherId: teacher.id,
      description: 'Conteudo do capitulo 1 ao 4'
    }
  });

  await prisma.grade.create({
    data: {
      schoolId: school.id,
      studentId: student.id,
      subjectId: subject.id,
      teacherId: teacher.id,
      examId: exam.id,
      value: 8.7,
      term: '1 Bimestre'
    }
  });

  await prisma.absence.create({
    data: {
      schoolId: school.id,
      studentId: student.id,
      subjectId: subject.id,
      teacherId: teacher.id,
      date: new Date(),
      reason: 'Consulta medica'
    }
  });

  await prisma.activity.create({
    data: {
      schoolId: school.id,
      title: 'Lista de exercicios',
      description: 'Resolver questoes 1 a 20',
      dueDate: new Date(Date.now() + 3 * 86400000),
      classId: classA.id,
      subjectId: subject.id,
      teacherId: teacher.id
    }
  });

  await prisma.occurrence.create({
    data: {
      schoolId: school.id,
      studentId: student.id,
      type: 'PRAISE',
      description: 'Excelente participacao na aula',
      createdById: schoolAdmin.id
    }
  });

  console.log('Seed enterprise concluido');
  console.table([
    { role: 'SAAS_ADMIN', email: 'owner@conectaescola.com', password: '123456' },
    { role: 'SCHOOL_ADMIN', email: 'admin@conectaescola.com', password: '123456' },
    { role: 'TEACHER', email: 'ana@conectaescola.com', password: '123456' },
    { role: 'PARENT', email: 'carlos@email.com', password: '123456' },
    { role: 'STUDENT', email: 'marina@email.com', password: '123456' }
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
