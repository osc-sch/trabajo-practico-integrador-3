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
  updateEvent,
} from "../controllers/event.controller.js";

export const eventRouter = Router();

eventRouter.get("/event", getAllEvent);
eventRouter.get("/event/:id", getEventById);
eventRouter.post("/event", createEventValidation, validate, createEvent);
eventRouter.put("/event/:id", updateEventValidations, validate, updateEvent);
eventRouter.delete("/event/:id", deleteEvent);
