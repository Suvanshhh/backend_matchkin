import { Server } from 'socket.io';
import { verifyJWT } from './utils/jwt.js';
import Message from './models/Message.js';

export default function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  io.use((socket, next) => {
    const token = socket.handshake.query.token;
    const payload = verifyJWT(token);
    if (!payload) return next(new Error('Unauthorized'));
    socket.user = payload;
    next();
  });

  io.on('connection', (socket) => {
    // Default room: 'general'
    const room = socket.handshake.query.room || 'general';
    socket.join(room);

    // Send last 20 messages
    Message.find({ room }).sort({ timestamp: -1 }).limit(20).then(msgs => {
      socket.emit('chat_history', msgs.reverse());
    });

    socket.on('chat_message', async (msg) => {
      const message = {
        room,
        sender: socket.user.email,
        content: msg,
        timestamp: new Date()
      };
      await Message.create(message);
      io.to(room).emit('chat_message', message);
    });

    socket.on('disconnect', () => {
      // Optionally handle disconnect logic
    });
  });

  return io;
}
