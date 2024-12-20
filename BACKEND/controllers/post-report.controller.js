import Post from "../models/posts.model.js";

/**
 * @description Get all Post
 * @function getAllPublications
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {Number} page - Page number
 * @query {Number} limit - Limit of publications
 * @returns {Object} - List of publications
 * @method GET
 */

export const getapost = async (req, res) => {
  try{
    const Post = await Post.find();
    res.json(Post);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error get Post' });
}
}

export const getAllPost = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const post = await Post.paginate({ deleted: false }, { page, limit });
    res.status(200).json(Post);
  } catch (error) {
    error === "ValidationError"
    res.status(500).json({ message: 'Error get all Post' });
  }
};

/**
 * @description Delete Post
 * @function deletePost
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.id - Post ID
 * @returns {Object} - Message
 * @method DELETE
 */
export const deletePost = async (req, res) => {
  try {
    const Post = await Post.findById(req.body.id);
    if (!Post) return res.status(404).json({ message: "Post not found" });
    await Publication.findByIdAndUpdate(req.body.id, { deleted: true });
    res.status(200).json("Publication deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error delete post' });
  }
};