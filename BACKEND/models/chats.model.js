import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema for chats
 * @typedef {Object} chatSchema
 * @property {Array} users - Users of the chat
 * @property {Array} messages - Messages of the chat
 * @property {Date} createdAt - Date of creation
 */

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

/**
 * Plugin for pagination
 */
chatSchema.plugin(mongoosePaginate);

/**
 * Model for chats
 */
const Chat = mongoose.model("Chat", chatSchema);

export { Chat };