import Chat from "../models/chat.model.js";

/**
 * @description create chat
 * @function Chat
 * @requires - authenticate middleware
 * @requires - authorize middleware
 * @method POST
 * @returns {Object} - The created chat
 */
export const createChat = async (req, res) => {
  try {
    const { users } = req.body;
    const newChat = new Chat({ users });
    await newChat.save();
    users.forEach(userId => {
      const user = User.findById(userId);
      io.to(user.socketId).emit('newChat', newChat);
    });
    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error create chat' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { roomId, message } = req.body;
    const chat = await Chat.findById(roomId);
    const newMessage = {
      sender: req.user._id,
      text: message,
      timestamp: Date.now()
    };
    chat.messages.push(newMessage);
    await chat.save();
    io.to(roomId).emit('newMessage', newMessage);
    res.json({ message: 'Mensaje enviado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
};
/**
 * @description delete chat by id
 * @function deleteChat
 * @requires - authenticate middleware
 * @method DELETE
 * @param {*} req - The request object
 * @param {*} res  - The response object
 */
export const deleteChat = async (req, res) => {
  try {
    const Chat = await Chat.findOneAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    if (!Chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json(Chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};