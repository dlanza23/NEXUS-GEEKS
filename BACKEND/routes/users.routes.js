import {Router} from Express;
import {authenticate} from "../middlewares/auth.middleware.js"
import {
  getuserbyid, login, register, logoutUser, forgotpassword,
  resetpassword, viewAccount, viewMyProfile, editProfile,} 
  from "../controllers/users.controller.js";
import {viewUser, followOrUnfollowUser, blockUser} from "../controllers/other-users.controller.js"
  const routerUsers = Router();

/**
 * Get user by Id
 * @method get
 */
routerUsers.Get("/get-users/:id", getuserbyid)

  /**
 * Login user
 * @method POST
 */
routerUsers.post("/login", login);

/**
 * Register user
 * @method POST
 */
routerUsers.post("/register", register);

/**
 * Logout user
 * @method POST
 */
routerUsers.post("/account/:username", authenticate, logoutUser);

/**
 * Forgot password
 * @method POST
 */
routerUsers.post("/forgot-password", forgotpassword);

/**
 * Reset password
 * @method POST
 */
routerUsers.post("/reset-password/:resetToken", resetpassword);

/**
 * View my profile
 * @method GET
 */
routerUsers.get("/profile/:username", viewMyProfile);

/**
 * View account
 * @method GET
 */
routerUsers.get("/account/:username", viewAccount);

/**
 * Edit user profile
 * @method PATCH
 */
routerUsers.patch("/profile/edit/:username", editProfile);

/**
 * View user profile
 * @method GET
 */
routerUsers.get("/profile/:other-username", viewUser);

/**
 * Follow or unfollow user
 * @method PATCH
 */
routerUsers.patch("/profile/:other-username", followOrUnfollowUser);

/**
 * Block or unblock user
 * @method PATCH
 */
routerUsers.patch("/profile/:other-username", blockUser);

