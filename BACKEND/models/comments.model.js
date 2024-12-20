import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema of comment
 * @typedef {Object} commentsSchema
 * @property {string} posts - Post of the comment.
 * @property {string} author - Author of the comment.
 * @property {string} content - Content of the comment.
 * @property {String} status - Status of the comment, "active" or "reported"
 * @property {string} createdAt - Created at of the comment.
 * @property {string} updatedAt - Updated at of the comment.
 */

const commentsSchema = new mongoose.Schema (
  {
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: { 
      type: String, 
      enum: ["active", "reported"], 
      default: "active" 
    },
    createdAt: {
      type: Date,
      default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
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
commentsSchema.plugin(mongoosePaginate);

/**
 * Model for comments
 * @typedef {Object} Comments
 */
const Comments = mongoose.model("Comments", commentsSchema);
export default Comments;