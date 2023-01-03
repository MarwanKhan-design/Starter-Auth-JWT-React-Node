import express from "express";
import { createUser, currentUser } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", auth, currentUser);

router.post("/", createUser);
export default router;
