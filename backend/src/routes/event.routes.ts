import { Router } from "express";
import eventController from "../controllers/event.controller.js";
import { auth } from "../middleware/middleware.js";

const router = Router();

router.get("/:id", auth, eventController.getEventById.bind(eventController));

export default router;
