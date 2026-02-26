const { Server } = require('socket.io');
const { verifyAccessToken } = require('./utils/jwt');

const createSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('UNAUTHORIZED'));
      const decoded = verifyAccessToken(token);
      socket.user = decoded;
      return next();
    } catch {
      return next(new Error('UNAUTHORIZED'));
    }
  });

  io.on('connection', (socket) => {
    if (socket.user?.userId) socket.join(`user:${socket.user.userId}`);
    if (socket.user?.schoolId) socket.join(`school:${socket.user.schoolId}`);
  });

  return io;
};

module.exports = createSocket;
