import Chat from "../models/chat.model.js";

/**
 * @description create chat
 * @function createChat
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