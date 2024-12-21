import { User } from "../models/users.model.js";

/**
 * @description Search user by full name, username
 * @function searchUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - List of users
 * @method GET
 */
export const searchUser = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(users);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error search' });
  }
};
