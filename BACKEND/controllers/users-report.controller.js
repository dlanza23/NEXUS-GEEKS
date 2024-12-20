import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

/**
 * @description Get all users
 * @function getAllUsers
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {Number} Page number
 * @query {Number} Limit of users
 * @returns {Object} - List of users
 * @method GET
 */
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const Users = await User.paginate(
      { deleted: false },
      { username: 1, email: 1, role: 1, status: 1, createdAt: 1, updatedAt: 1 },
      { page, limit }
    );
    res.status(200).json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting users' });
  }
}

/**
 * @description Create user
 * @function createUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} fullName - Full name of the user
 * @body {String} username - Username of the user
 * @body {String} email - Email of the user
 * @body {String} password - Password of the user
 * @body {String} confirmPassword - Confirm password of the user
 * @body {String} role - Role of the user
 * @returns {Object} - Message
 * @method POST
 */
export const createUser = async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email }, { email: 1 });
    if (emailExists) {
      return res.status(400).json({ error: "There is a registered user with this email" });
    }
    const usernameExists = await User.findOne({ username: req.body.username }, { username: 1 });
    if (usernameExists) {
      return res.status(400).json({ error: "Username already exists" });
    }
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS));
    }
    delete req.body.confirmPassword;
    const user = new User(req.body);
    await user.save();
    res.status(201).json("User created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating usuario' });
  }
}

/**
 * @description Edit user
 * @function editUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.fullName - Full name of the user
 * @param {String} req.body.username - Username of the user
 * @param {String} req.body.email - Email of the user
 * @param {String} req.body.role - Role of the user
 * @returns {Object} - Message
 * @method PATCH
 */
export const editUser = async (req, res) => {
  try {
    const UserExists = await User.findOne(
      { $or: [{ username: req.body.email }, { email: req.body.email }] },
      { _id: 1, status: 1, deleted: 1 }
    );
    if (!UserExists) {
      return res.status(404).json({ error: "User not found" });
    }
    await User.findByIdAndUpdate(UserExists._id, req.body);
    res.status(200).json("User edited");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error edited user' });
  }
}

/**
 * @description Block or unblock user
 * @function BlUnUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} Username of the user
 * @returns {Object} - Message
 * @method PATCH
 */
export const BlUnUser = async (req, res) => {
  try {
    const UserExists = await User.findOne({ Username: req.body.username }, {_id: 1, status: 1, deleted: 1 });
    if (!UserExists) {
      return res.status(404).json({ error: "User not found" });
    }
    if (UserExists.deleted) {
      return res.status(403).json({ error: "User has been deleted" });
    }
    if (UserExists.status === "blocked") {
      await User.findByIdAndUpdate( UserExists._id, { status: "active" } );
      res.status(200).json("User unblocked");
    } else if (userExists.status === "active" || UserExists.status === "reported") {
      await User.findByIdAndUpdate( UserExists._id, { status: "blocked" } );
      res.status(200).json("User blocked");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error block/unblock user' });
  }
}

/**
 * @description Delete user
 * @function deleteUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.username - Username of the user
 * @returns {Object} - Message
 * @method DELETE
 */
export const deleteUser = async (req, res) => {
  try {
    const UserExists = await User.findOne({ username: req.body.username }, { _id: 1, status: 1, deleted: 1 });
    if (!UserExists) {
      return res.status(404).json({ error: "User not found" });
    }
    if (UserExists.deleted) {
      return res.status(403).json({ error: "User has been deleted" });
    }
    await User.findByIdAndUpdate( userExists._id, { deleted: true } )
    res.status(200).json("User deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error delete user' });
  }
}