import Comments from "../models/comments.model"
import User from "../models/users.model.js";
import Post from "../models/posts.model.js";

/**
 * @description Comment on a publication
 * @function comment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Message
 * @method POST
 */
export const comment = async (req, res) => {
  try{
    const Post = await Post.findById(req.params.id);
    if (!Post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }
    const newComment = new Comment({
      text,
      author: req.user._id,
      publication: publicationId
    });
    await newComment.save();
    publication.comments.push(newComment._id);
    await publication.save();
  }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error created comment' });
  }
}

/**
 * @Description Delete comment
 * @function Commentdelete
 * @param {*} req Contains commentId
 * @param {*} res Contains message
 * @returns Message
 * @method PATCH
 */
export const Commentdelete = async (req, res) => {
  try{
    const { CommentId } = req.params;
    const Comment = await Comment.findById(CommentId);
    if (!Comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    Comment.deleted = true;
    await Comment.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error delete comment' });
  }
}

/**
 * @description Get comments of a publication
 * @function getallcoments
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - List of comments
 * @method GET
 */
export const getallComments = async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (!Post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comments = await Comment.find({ deleted: false });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting comment' });
  }
};

/**
 * @description Report a comment
 * @function reportcomment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Message
 * @method PATCH
 */
export const reportComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    comment.reported = true;
    await comment.save();
    return res.status(200).json("Comment reported");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error report comment' });
  }
}

/**
 * @description Update a comment
 * @function updateComment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Message
 * @method PATCH
 */
export const updateComment = async (req, res) => {
  try {
    const { PostId, CommentId } = req.params;
    const { content } = req.body;
    const comment = await Comment.findById(CommentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    const Post = await Post.findById(PostId);
    if (!Post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    comment.content = content;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error update comment' });
  }
};


