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

export const categoryRouter = Router();

categoryRouter.get("/category", getAllCategory);
categoryRouter.get("/category/:id", getCategoryById);
categoryRouter.post(
  "/category",
  createCategoryValidations,
  validate,
  createCategory,
);
categoryRouter.put(
  "/category/:id",
  updateCategoryValidations,
  validate,
  updateCategory,
);
categoryRouter.delete("/category/:id", deleteCategory);
