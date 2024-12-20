import { User } from "../models/users.model.js";

/**
 * @description View user profile
 * @function viewUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} username - Username of the user
 * @returns {Object} - User
 * @method GET
 */
export const viewUser =  async (req, res) => {
  try {
    const User = await User.findOne({ username: req.params.username });
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }
    const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting infuser' });
  }
};


/**
 * @description Follow or unfollow user
 * @function followOrUnfollowUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} Username of my user
 * @body {String} Username of the user I want to follow or unfollow
 * @returns {Object} - Message
 * @method PATCH
 */
export const followOrUnfollowUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id); 
    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }
    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);
    await currentUser.save();
    await userToFollow.save();
    res.json({ message: 'User followed correctly' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error following user' });
  }
};

/**
 * @description Block user only for me
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of my user
 * @body {String} Username of the user I want to block
 * @returns {Object} - Message
 * @method PATCH
 */
export const blockUser = async (req, res) => {
  try {
    const CurrentUser = await User.findById(req.user._id);
    const UserToBlock = await User.findById(req.params.id);
    if (!UserToBlock) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (currentUser.following.includes(userToBlock._id)) {
      currentUser.following = currentUser.following.filter(id => id !== userToBlock._id);
    }
    currentUser.blockedUsers.push(userToBlock._id);
    await currentUser.save();
    res.json({ message: 'Usuario block correctly' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error block user' });
  }
};

