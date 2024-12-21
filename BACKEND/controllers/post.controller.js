import Post from "../models/posts.model.js";

/**
 * @description My Post
 * @function MyPost
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Post ID
 * @returns {Object} - Updated publication
 * @method GET
 */
export const MyPost = async (req, res) => {
  try {
    const Post = await Post.findById(req.Post.id);
    if (!Post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(Post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting post' });
  }
};

/**
 * @description Create a new post
 * @function createPost
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {String} - Message
 * @method POST
 */
export const createPost = async (req, res) => {
  try {
    user = await User.findOne({ username: req.user.username });
    if (user.status === "blocked" || user.deleted) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and conten requered' });
    }
    const newPost = new Post({
    title,
    content
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error created post' });
  }
}

/**
 * @description Edit a post
 * @function updatePost
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {String} - Message
 * @method PATCH
 */
export const updatePost = async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (!Post || Post.deleted) {
      return res.status(404).json({ error: "Post not found or deleted" });
    }
    if (req.file) {
      req.body.media = req.file.path;
    }
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("Post updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updated post' });
  }
};

/**
 * @description Delete a Post
 * @function deletePost
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {String} - Message
 * @method DELETE
 */
export const deletePost = async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (!Post || Post.deleted) {
      return res.status(404).json({ error: "Post not found or deleted" });
    }
    await Post.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).json("Publication deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleted post' });
  }
};


