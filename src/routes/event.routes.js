import { Router } from "express";
import { createEventValidation } from "../middlewares/validations/event.validations.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createEvent,
  getAllEvent,
  getEventById,
} from "../controllers/event.controller.js";

export const eventRouter = Router();

eventRouter.get("/event", getAllEvent);
eventRouter.get("/event/:id", getEventById);
eventRouter.post("/event", createEventValidation, validate, createEvent);
// eventRouter.put("/event/:id");
// eventRouter.delete("/event/:id");
