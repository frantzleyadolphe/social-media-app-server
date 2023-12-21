import express from "express";
import { verifyToken } from "../middleware/auth";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

const router = express.Router();

/*READ*/

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */

// @route   PATCH api/posts/:id/like

router.patch("/:id/like", verifyToken, likePost);

export default router;
