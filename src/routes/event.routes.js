import { Router } from "express";
import {
  createEventValidation,
  updateEventValidations,
} from "../middlewares/validations/event.validations.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createEvent,
  deleteEvent,
  getAllEvent,
  getEventById,
  getUserEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";

export const eventRouter = Router();

eventRouter.get("/events", authMiddleware, getAllEvent);
eventRouter.get("/events/my", authMiddleware, getUserEvents);
eventRouter.get("/events/:id", authMiddleware, getEventById);
eventRouter.post(
  "/events",
  authMiddleware,
  createEventValidation,
  validate,
  createEvent,
);
eventRouter.put(
  "/events/:id",
  authMiddleware,
  ownerOrAdminMiddleware,
  updateEventValidations,
  validate,
  updateEvent,
);
eventRouter.delete(
  "/events/:id",
  authMiddleware,
  ownerOrAdminMiddleware,
  deleteEvent,
);
