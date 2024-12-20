import { Server } from 'socket.io';
import User from "../models/users.model"
import jwt from "jsonwebtoken";

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error: Token is missing'));
  }
  try {
    const decoded = jwt.verify(token, 'tu_secreto');
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(new Error('Authentication error: User not found'));
      }
    socket.user = user;
    socket.join(`room-${user.role}`);
    next();
  } catch (error) {
      console.error('Authentication error:', error);
      next(new Error('Authentication error'));
    }
});n
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);
  socket.on('message', (msg) => {
  console.log('Message from', socket.user.username, ':', msg);
  io.to(`room-${socket.user.role}`).emit('message', {
    user: socket.user.username,
    message: msg
  });
    });
});