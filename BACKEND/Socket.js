import { Messgae } from "../BACKEND/models/messages.model";
import { Chat } from "../BACKEND/models/chats.model"

export const Socket = async (io) => {
  console.log('A user connected');
  // Cuando un usuario se conecta, actualiza su socketId en la base de datos
  socket.on('join', async (userId) => {
    const user = await User.findByIdAndUpdate(userId, { socketId: socket.id });
    socket.join(user.username); // Unir al usuario a una sala con su nombre de usuario
  });
  // Cuando se envía un mensaje
  socket.on('sendMessage', async ({ roomId, message }) => {
    const chat = await Chat.findById(roomId);
    const newMessage = {
      sender: socket.request.user._id, // Suponiendo que tienes autenticación
      text: message,
      timestamp: Date.now()
    };
    chat.messages.push(newMessage);
    await chat.save();
    io.to(roomId).emit('newMessage', newMessage);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
};