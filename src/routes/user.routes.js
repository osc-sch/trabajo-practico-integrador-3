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
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);
userRouter.get("/users/:id", authMiddleware, adminMiddleware, getAllById);
userRouter.post(
  "/users",
  authMiddleware,
  adminMiddleware,
  createUserValidations,
  validate,
  createUser,
);
userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidations,
  validate,
  updateUser,
);
userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserValidations,
  validate,
  deletUser,
);
