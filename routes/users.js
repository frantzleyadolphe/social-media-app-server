import express from "express";
import {
  getUser,
  getUserFriend,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

/* READ FUNCTION DATA */

// @route   GET /api/user/:id
router.get("/:id", verifyToken, getUser);
// @route  GET /api/user/id/friendList
router.get("/:id/friends", verifyToken, getUserFriend);

/* UPDATE FUNCTION DATA */

// @route   POST /api/user/addFriend/:id
router.patch("/addFriend/:id", verifyToken, addRemoveFriend);

export default router;
