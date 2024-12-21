import Message from "../models/messages.model.js";

/**
 * @Function sendMessage
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The created message
 * @method POST
 */
export const sendMessage = async (req, res) => {
  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    if (!conversation.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'No authorized to send messages' });
    }
    const { chatId, senderId, receiverId, content } = req.body;
    const message = new Message({
      chat: chatId,
      sender: senderId,
      receiver: receiverId,
      content,
      read: false,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error send message' });
  }
};

/**
 * delete message
 * @function deleteMessage
 * @async - The function is asynchronous
 * @method PATCH
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns - {Object} - The deleted message
 */
export const deleteMessage = async (req, res) => {
  try {
    const Message = await Message.findByIdAndUpdate(req.params.id, {
      deleted: true,
    });
    if (!Message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error delete message' });
  }
};

/**
 * get message
 * @function getMessage
 * @async - The function is asynchronous
 * @method GET
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns {Object} - The messages
 */
export const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId)
    .populate('messages')
    .sort({ createdAt: -1 });
    if (!Conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
    }
    res.json(conversation.messages);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting messages' });
}
};

/**
 * @description Mark as read
 * @function readMessage
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} Message ID
 * @return {Object} - Message
 * @method PATCH
 */
export const readMessage = async (req, res) => {
  try {
      const { MessageId } = req.params;
      const Message = await Message.findById(MessageId);
      if (!Message) {
        return res.status(404).json({ Message: 'Menssage not found' });
      }
      if (message.recipient.toString() !== req.user._id) {
        return res.status(403).json({ message: 'No autorized to marl this message with read' });
      }
      message.read = true;
      await message.save();
      res.json({ message: 'Message mark read' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error the mark the message with read' });
  }
};