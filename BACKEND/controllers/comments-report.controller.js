import { Comment } from "../models/comments.model.js";

/**
 * @description Get all comments
 * @function getAllComments
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {Number} page - Page number
 * @query {Number} limit - Limit of comments
 * @returns {Object} - List of comments
 * @method GET
 */
export const getAllComments = async (req, res) => {
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
 * @description Delete comment
 * @function deleteComment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.id - Id of the comment
 * @returns {Object} - Message
 * @method DELETE
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
    res.status(500).json({ message: 'Error delete comment'});
}
}