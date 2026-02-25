require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { setSocket } = require('./config/socket');
const registerSocket = require('./sockets');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || '*' }
});

setSocket(io);
registerSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`ConectaEscola API rodando na porta ${PORT}`);
});
