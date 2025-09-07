// routes/authRoutes.js
import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", authController.me);

export default router;
