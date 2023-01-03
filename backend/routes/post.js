import express from "express";
import { createPost, deletePost, getPosts } from "../controllers/post.js";
import { isAdmin } from "../middleware/admin.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.delete("/:id", [auth, isAdmin], deletePost);

export default router;
