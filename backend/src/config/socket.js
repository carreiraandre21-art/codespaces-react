let io;

const setSocket = (socketServer) => {
  io = socketServer;
};

const getSocket = () => io;

module.exports = { setSocket, getSocket };
