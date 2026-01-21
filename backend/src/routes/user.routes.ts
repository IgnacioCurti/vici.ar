import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { auth } from "../middleware/middleware.js";

const router = Router();

router.get("/:id", auth, userController.getUserById.bind(userController));

export default router;
