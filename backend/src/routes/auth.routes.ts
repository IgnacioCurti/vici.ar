import express from "express";
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/verify-email/:id/:code", authController.verifyEmail.bind(authController));

export default router;
