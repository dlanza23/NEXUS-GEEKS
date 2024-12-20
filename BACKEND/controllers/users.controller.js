import bcrypt from "bcrypt";
import User from "../models/users.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
/**
 * Get user by ID
 * @function getUserById
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - User by ID
 * @method GET
 */
export const getuserbyid = async (req, res) => {
  const {UserID} = req.params
  try {
    if (UserID.length === 24) {
      User.findById(userID).then ((User) => {
        if (!User){
          return res.status(404).json({message: 'user not found'})
        }else {
          const {_id, password,__v,...resto} = User._doc;
          return res.json(resto)
        }
      });
    }else{
      res.status().json({message: "password incorrect"})
    }
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting users' });
  }
};

/**
 * @description Login user
 * @function login
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} Email of the user
 * @body {String} Password of the user
 * @returns {String} - Message
 * @method POST
 */
export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    User.findOne({email}).then((User) => {
      if(!User){
        return res.status(404).json({message: "user not found"})
      }
      bcrypt.compare(password, User.password).then((correct) => {
        if(correct) {
          const {id, name}= User;
          res.json({
            messge: 'User login', 
            user: {
              id, name
            },
          });
        }else{
          return res.json({message: "password incorrect"})
        }
      });
    });
    const token = jwt.sign({ UserId: User._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ user, token });
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error loggin in' });
  }
};

/**
 * @description Register user
 * @function registerUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} Full name of the user
 * @body {String} Username of the user
 * @body {String} Email of the user
 * @body {String} Password of the user
 * @returns {String} - Message
 * @method POST
 */
export const register = async (req, res) => {
  const {fullName, Username, email, password,} = req.body;
  try {
    const Emailexists = await  User.findOne ({Email}).then((User))
    if (Emailexists) {
      return res.status(409).json({ error: "There is a user with that email." });
    } 
    const Usernameexists = await User.findOne ({User}).then((User))
    if (Usernameexists) {
      return res.status(409).json({ error: "There is a user with that username." });
    }
    const User = new User({ Username, email, password, role });
    User.password = bcrypt.hashSync(User.password, 8);
    await User.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.status(201).send({ user, token });
    (!fullName || !Username || !email || !password); {
      return res.status(409).json({ error: "he is missing fullname / user / email / password." });
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
}

/**
 * @description out a user
 * @function logoutUser
 */
export const logoutUser = async (req, res) => {
  try {
    res.status(200).send({ message: "User logged out successfully." });
  } catch (error) {
    console.error(error);
    }
};

/**
 * @description Forgot password
 * @function forgotPassword
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {String} - Message
 * @method POST
 */
export const forgotpassword = async (req, res) => {
  const {email} = req.body;
  try{
    const User = await User.findOne({ email });
    if (!user){
      return res.status(404).json({ error: 'User not found' });
    }
    const resetToken = jwt.sign({ userId: user._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h' });
    const transporter = nodemailer.createTransport({})
    const mailOptions = {
      from: 'your_email@example.com',
      to: user.email,
      subject: 'Reset Password Request',
      html: `
          <p>Click the link below to reset your password:</p>
          <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">Restablecer contraseña</a>
      `
  };
  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: 'an email has been sent with instructions to reset your password' });
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
}
};

/**
 * @description Reset password
 * @function resetPassword
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} Password of the user
 * @returns {String} - Message
 * @method PATCH
 */
export const resetpassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const UserId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password updated succesfully' });
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error resetting password' });
}
}


/**
 * @description View my account
 * @function viewAccount
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - User account data
 * @method GET
 */
export const viewAccount = async (req, res) => {
  try {
    const User = await User.findOne({ username: req.params.Username });
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }
    if (User.status === "blocked" || User.deleted) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting user profile' });
    }
}

/**
 * @description View my profile
 * @function viewProfile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - User profile data
 * @method GET
 */
export const viewMyProfile = async (req, res) => {
  try {
    const User = await User.findOne({ Username: req.params.Username }, { status: 1, deleted: 1, fullName: 1, username: 1, profilePicture: 1, bio: 1, interests: 1, followers: 1, following: 1, inspirations: 1, subscription: 1 });
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }
    if (User.status === "blocked" || User.deleted) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * @description Edit my profile
 * @function editProfile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of the user
 * @body {String} fullName - Full name of the user
 * @body {String} username - Username of the user
 * @body {String} profilePicture - Profile picture of the user
 * @body {String} bio - Bio of the user
 * @body {Array} interests - Interests of the user
 * @returns {Object} - Message
 * @method PATCH
*/
export const editProfile = async (req, res) => {
  try {
    const User = await User.findOne({ username: req.params.Username }, { _id: 1, status: 1, deleted: 1 });
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }
    if (User.status === "blocked" || User.deleted) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    const { error } = validateProfile(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    if (req.file) {
      req.body.profilePicture = req.file.path;
    }
    await User.findByIdAndUpdate(user._id, req.body);
    res.status(200).json("User updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updated profile' });
  }
};