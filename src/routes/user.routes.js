import { Router } from "express";
import {
  createUser,
  deletUser,
  getAllById,
  getAllUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createUserValidations,
  deleteUserValidations,
  updateUserValidations,
} from "../middlewares/validations/user.validations.js";

export const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getAllById);
userRouter.post("/users", createUserValidations, validate, createUser);
userRouter.put("/users/:id", updateUserValidations, validate, updateUser);
userRouter.delete("/users/:id", deleteUserValidations, validate, deletUser);
