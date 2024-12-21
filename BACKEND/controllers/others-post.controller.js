import { Post } from "../models/posts.model.js";
import { User } from "../models/users.model.js";

/**
 * @description View a post
 * @function viewPost
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} Publication ID
 * @returns {Object} - Publication
 * @method GET
 */
export const viewPost = async (req, res) => {
  try {
    const Post = await Publication.findById(req.params.id);
    if (!Post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(POst);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error view post' });
}
};

/**
 * @description Share a publication
 * @function sharePost
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {String} - Link to the publication
 * @method PATCH
 */
export const sharePost = async (req, res) => {
  try {
    const { content } = req.body;
    const user = await User.findById(req.user._id);
    const newPost = new Post({
      content,
      user: user._id
    });
    await newPost.save();
    user.posts.push(newPost._id);
    await user.save();
    res.status(201).json(newPost);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sharing post' });
  }
};

/**
 * @description Report a publication
 * @function reportPost
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {String} - Message
 * @method PATCH
 * @example http://localhost:3001/publications/:id
 */
export const reportPost = async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (!Post) {
      return res.status(404).json({ error: "Post not found" });
    }
    Post.status = "reported";
    await publication.save();
    res.status(200).json("Post reported");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error reporting post' });
}
};

/**
 * @description save a post
 * @function savepost
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {String} - Message
 * @method PATCH
 */
export const savepost = async (req, res) => {
  try {
    const { content } = req.body;
    const imageUrl = req.file ? `/uploads/posts/${req.file.filename}` : null;
    const user = await User.findById(req.user._id);
    const newPost = new Post({
      content,
      imageUrl,
      user: user._id
    });
    await newPost.save();
    user.posts.push(newPost._id);
    await user.save();
    res.status(201).json(newPost);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving post' });
  }
};