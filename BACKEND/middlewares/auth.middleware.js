import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const User = await User.findOne({_id: new mongoose.Types.ObjectId(decoded.id),});
    if (!User) {
      throw new Error("User not found");
    }
    req.user = User;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
}
};
