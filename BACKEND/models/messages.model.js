import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema of message
 * @typedef {Object} messageSchema
 * @property {string} sender - Sender of the messages.
 * @property {string} receiver - The receiver of the message.
 * @property {string} content - The content of the message.
 * @property {string} createdAt - The created at of the message.
 * @property {string} read - The read status of the message.
 */

const messagesSchema = new mongoose.Schema (
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    read: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

/**
 * Plugin for pagination
 */
messageSchema.plugin(mongoosePaginate);

/**
 * Model for message
 * @typedef {Object} Message
 */
const Message = mongoose.model("Message", messageSchema);

export default Message;