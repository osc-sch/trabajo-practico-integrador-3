import { Router } from "express";
import {
  createCategoryValidations,
  updateCategoryValidations,
} from "../middlewares/validations/category.validations.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const categoryRouter = Router();

categoryRouter.get("/categories", authMiddleware, getAllCategory);
categoryRouter.get("/categories/:id", authMiddleware, getCategoryById);
categoryRouter.post(
  "/categories",
  authMiddleware,
  adminMiddleware,
  createCategoryValidations,
  validate,
  createCategory,
);
categoryRouter.put(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  updateCategoryValidations,
  validate,
  updateCategory,
);
categoryRouter.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory,
);
