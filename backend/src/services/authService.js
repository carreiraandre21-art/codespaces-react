const prisma = require('../config/prisma');
const { hashPassword, comparePassword, signToken } = require('../utils/security');

const registerParentAndStudent = async ({ parent, student }) => {
  const existing = await prisma.user.findUnique({ where: { email: parent.email } });
  if (existing) throw new Error('Email já cadastrado.');

  const parentUser = await prisma.user.create({
    data: {
      name: parent.name,
      email: parent.email,
      password: await hashPassword(parent.password),
      role: 'PARENT',
      parent: { create: { phone: parent.phone } }
    },
    include: { parent: true }
  });

  const studentUser = await prisma.user.create({
    data: {
      name: student.name,
      email: `${student.registration}@aluno.conectaescola.local`,
      password: await hashPassword(student.registration),
      role: 'STUDENT',
      student: {
        create: {
          registration: student.registration,
          birthDate: new Date(student.birthDate),
          classId: student.classId,
          parentId: parentUser.parent.id
        }
      }
    }
  });

  return { parentUser, studentUser };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciais inválidas.');

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) throw new Error('Credenciais inválidas.');

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  return { token, user: { id: user.id, name: user.name, role: user.role, email: user.email } };
};

const forgotPassword = async ({ email }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { message: 'Se o email existir, instruções foram enviadas.' };

  return { message: `Recuperação solicitada para ${email}. Integre com provedor de email.` };
};

module.exports = { registerParentAndStudent, login, forgotPassword };
