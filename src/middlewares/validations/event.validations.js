import { body } from "express-validator";
import { EventModel } from "../../models/event.model.js";
import { CategoryModel } from "../../models/category.model.js";

export const createEventValidation = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 150 })
    .withMessage("El título debe tener entre 3 y 150 caracteres")
    .custom(async (title) => {
      const existingEvent = await EventModel.findOne({ title });
      if (existingEvent) {
        throw new Error("Ya existe un evento con este título");
      }
      return true;
    }),
  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),
  body("startDate")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria")
    .isDate()
    .withMessage("La fecha de inicio debe ser una fecha válida"),
  body("endDate")
    .notEmpty()
    .withMessage("La fecha de finalización es obligatoria")
    .isDate()
    .withMessage("La fecha de finalización debe ser una fecha válida"),
  body("capacity")
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un número entero mayor o igual a 1"),
  body("price")
    .isNumeric({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),
  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("El estado debe ser 'scheduled', 'cancelled' o 'finished'"),
  body("categories")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos una categoría")
    .custom(async (categories) => {
      for (const category of categories) {
        if (!category || typeof category !== "string") {
          throw new Error("Cada categoría debe ser un ID de Mongo válido");
        }

        const exsitCategoty = await CategoryModel.findById(category);

        if (!exsitCategoty) {
          throw new Error("no se encontro la categoria con el ID", category);
        }
      }
      return true;
    }),
  body("location.venue")
    .notEmpty()
    .withMessage("El lugar es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("el nombre del lugar debe tener entre 3 y 100 caracteres"),
  body("location.address")
    .notEmpty()
    .withMessage("La dirección es obligatoria")
    .isLength({ min: 5, max: 150 })
    .withMessage("el nombre del lugar debe tener entre 5 y 150 caracteres"),
  body("location.city")
    .notEmpty()
    .withMessage("La ciudad es obligatoria")
    .isLength({ min: 2, max: 50 })
    .withMessage("el nombre del lugar debe tener entre 2 y 50 caracteres"),
];

export const updateEventValidations = [
  body("title")
    .optional()
    .isLength({ min: 3, max: 150 })
    .withMessage("El título debe tener entre 3 y 150 caracteres")
    .custom(async (title) => {
      const existingEvent = await EventModel.findOne({ title });
      if (existingEvent) {
        throw new Error("Ya existe un evento con este título");
      }
      return true;
    }),
  body("description")
    .optional()
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),
  body("startDate")
    .optional()
    .isDate()
    .withMessage("La fecha de inicio debe ser una fecha válida"),
  body("endDate")
    .optional()
    .isDate()
    .withMessage("La fecha de finalización debe ser una fecha válida"),
  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un número entero mayor o igual a 1"),
  body("price")
    .optional()
    .isNumeric({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),
  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("El estado debe ser 'scheduled', 'cancelled' o 'finished'"),
  body("categories")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos una categoría")
    .custom(async (categories) => {
      for (const category of categories) {
        if (!category || typeof category !== "string") {
          throw new Error("Cada categoría debe ser un ID de Mongo válido");
        }

        const exsitCategoty = await CategoryModel.findById(category);

        if (!exsitCategoty) {
          throw new Error("no se encontro la categoria con el ID", category);
        }
      }
      return true;
    }),
  body("location.venue")
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage("el nombre del lugar debe tener entre 3 y 100 caracteres"),
  body("location.address")
    .optional()
    .isLength({ min: 5, max: 150 })
    .withMessage("el nombre del lugar debe tener entre 5 y 150 caracteres"),
  body("location.city")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("el nombre del lugar debe tener entre 2 y 50 caracteres"),
];
