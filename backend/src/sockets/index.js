const jwt = require('jsonwebtoken');

const registerSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Não autorizado'));
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user;
      return next();
    } catch (error) {
      return next(new Error('Token inválido'));
    }
  });

  io.on('connection', (socket) => {
    socket.join(`user:${socket.user.id}`);
    socket.on('disconnect', () => {});
  });
};

module.exports = registerSocket;
