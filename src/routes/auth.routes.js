import { Router } from "express";
import {
  loginValidations,
  registerValidations,
} from "../middlewares/validations/auth.validations.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  getUserProfile,
  login,
  logout,
  register,
  updateUserProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRoutes = Router();

authRoutes.post("/auth/register", registerValidations, validate, register);
authRoutes.post("/auth/login", loginValidations, validate, login);
authRoutes.post("/auth/logout", authMiddleware, logout);
authRoutes.get("/auth/profile", authMiddleware, getUserProfile);
authRoutes.put("/auth/profile", authMiddleware, updateUserProfile);
