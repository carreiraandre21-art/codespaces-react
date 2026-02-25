const prisma = require('../config/prisma');
const { getSocket } = require('../config/socket');

const notifyParentByStudent = async (studentId, title, message, type) => {
  const student = await prisma.student.findUnique({ where: { id: studentId }, include: { parent: true } });
  if (!student?.parent?.userId) return;

  const notification = await prisma.notification.create({
    data: {
      userId: student.parent.userId,
      title,
      message,
      type
    }
  });

  const io = getSocket();
  if (io) {
    io.to(`user:${student.parent.userId}`).emit('notification:new', notification);
  }
};

module.exports = { notifyParentByStudent };
