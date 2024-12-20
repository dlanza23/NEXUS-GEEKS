import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema of posts
 * @typedef {Object} postsSchema
 * @property {string} author - Author of the post.
 * @property {string} content - Content of the post.
 * @property {Array} media - Media of the publication
 * @property {string} likes - Likes of the post.
 * @property {string} comments - Comments of the post.
 * @property {string} createdAt - Created at of the post.
 * @property {string} updatedAt - Updated at of the post.
 * @property {String} status - Status of the publication, "active" or "reported"
 * @property {string} createdAt - The created at of the post.
 * @property {string} updatedAt - The updated at of the post. 
*/

const PostSchema = new mongoose.Schema (
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String
    },
    media: [
      {
        type: String
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    hashtags: [
      {
        type: String,
      }],
    status: [
      { 
        type: String, 
        enum: ["active", "reported"], 
        default: "active" }
    ],
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
postsSchema.plugin(mongoosePaginate);

/**
 * Model of posts
 * @typedef {Object} postsModel
 * @category Models
 */
const Post = mongoose.model("Posts", PostSchema);
export default Post;