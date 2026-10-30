import { body } from "express-validator";
import { CategoryModel } from "../../models/category.model.js";

export const createCategoryValidations = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la categoria es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("el nombre de la categoria debe tener entre 2 a 30 caracteres")
    .bail()
    .custom(async (name) => {
      const existCategory = await CategoryModel.findOne({ name });

      if (existCategory) {
        throw new Error("esta categoria ya esta creada");
      }
      return true;
    }),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("El nombre de la categoria es obligatorio")
    .isLength({ max: 200 })
    .withMessage("La descripcion no debe tener mas de 200 caracteres"),
];

export const updateCategoryValidations = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre de la categoria es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("el nombre de la categoria debe tener entre 2 a 30 caracteres")
    .bail()
    .custom(async (name) => {
      const existCategory = await CategoryModel.find({ name });

      if (existCategory) {
        throw new Error("esta categoria ya esta creada");
      }
      return true;
    }),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("El nombre de la categoria es obligatorio")
    .isLength({ max: 200 })
    .withMessage("La descripcion no debe tener mas de 200 caracteres"),
];
