import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema for users
 * @typedef {Object} usersSchema
 * @property {String} fullName - Full name of the user
 * @property {String} username - Username of the user
 * @property {String} email - Email of the user
 * @property {String} password - Password of the user
 * @property {String} profilePicture - Profile picture of the user
 * @property {String} bio - Bio of the user
 * @property {Array} followers - Followers of the user
 * @property {Array} following - Following of the user
 * @property {Array} publications - Post of the user
 * @property {String} role - Role of the user, "admin", "user" or "userpremium"
 * @property {Object} subscription - Subscription of the user
 * @property {String} status - Status of the user, "active", "blocked" or "reported"
 * @property {Array} blockedUsers - Blocked users of the user
 * @property {Date} createdAt - Date of creation
 * @property {Date} updatedAt - Date of update
 * @property {Boolean} deleted - Deleted status of the user
  */

const UsersSchema = new mongoose.Schema(
  {
    fullName: { 
      type: String, 
      required: true 
    },
    username: { 
      type: String, 
      required: true, 
      unique: true,
      minlength: [3, "The user must have a minimum of 3 characters"],
      validate: /^[a-zA-Z0-9 ]+$/,
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true,
      minlength: [5, "Password must be at least 5 characters long"],
    },
    profilePicture: { 
      type: String 
    },
    bio: { 
      type: String,
      maxlength: [150, "The bio must have a maximum of 150 characters."],
    },
    followers: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      }
    ],
    following: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      }
    ],
    posts: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post" 
      }
    ],
    role: 
    { 
      type: String, 
      enum: ["admin", "user", "userpremium"], 
      default: "user" 
    },
    subscription: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Subscription" 
    },
    status: { 
      type: String, 
      enum: ["active", "blocked", "reported"], 
      default: "active" 
    },
    blockedUsers: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" }
    ],
    createdAt: {
      type: Date,
      default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
},
    deleted: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true }
);

/**
 * Plugin for pagination
 */
UsersSchema.plugin(mongoosePaginate);

/**
 * Model for users
 * @typedef {Object} Users
 */
const Users = mongoose.model("User", UsersSchema);

export default Users;