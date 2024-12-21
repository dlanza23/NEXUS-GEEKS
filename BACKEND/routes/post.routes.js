import { Router} from "express";
import {createPost, updatePost, deletePost} from "../controllers/post.controller";

/**
 * Post routes
 */
const routerPost = Router();

/**
 * Create a new publication
 * @method POST
 */
routerPost.post("/post/new-post", createPost);

/**
 * Edit a publication
 * @method PATCH
 */
routerPost.patch("/post/:id", updatePost);

/**
 * Delete a publication
 * @method DELETE
 */
routerPost.delete("/post/:id", deletePost);


