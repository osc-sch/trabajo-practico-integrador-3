import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const registerValidations = [
  body("username")
    .notEmpty()
    .withMessage("En campo username no debe estar vacio")
    .trim()
    .isLength({ min: 3, max: 20 })
    .isAlphanumeric()
    .withMessage("El username debe contener letras y números")
    .custom(async (username) => {
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        throw new Error("El username ya esta en uso");
      }
      return true;
    }),
  body("email")
    .notEmpty()
    .withMessage("En campo email no debe estar vacio")
    .isEmail()
    .withMessage("El email no tiene un formato valido")
    .custom(async (email) => {
      const existingEmail = await UserModel.findOne({ email });
      if (existingEmail) {
        throw new Error("El email ya esta reguistrado");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("En campo password no debe estar vacio")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("Debe contener al menos una minuscula")
    .matches(/[a-z]/)
    .withMessage("Debe contener al menos una mayúscula")
    .matches(/[0-9]/)
    .withMessage("Debe contener al menos un numero"),
  body("role")
    .default("user")
    .isIn(["admin", "user"])
    .withMessage("El rol debe ser 'admin' o 'user'"),
  body("profile.firstName")
    .notEmpty()
    .withMessage("En campo nombre no debe estar vacio")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES")
    .withMessage("El nombre solo debe contener letras"),
  body("profile.lastName")
    .notEmpty()
    .withMessage("En campo apellido no debe estar vacio")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES")
    .withMessage("El apellido solo debe contener letras"),
  body("profile.birthDate")
    .optional()
    .isDate({ format: "YYYY-MM-DD", strictMode: true })
    .withMessage("La fecha no es valida")
    .custom((birthDate) => {
      const fecha = new Date(birthDate);
      const hoy = new Date();

      if (fecha > hoy) {
        throw new Error("La fecha no puede ser futura");
      }
      return true;
    }),
  body("profile.phone")
    .optional()
    .isNumeric()
    .withMessage("El teléfono solo puede contener números")
    .isLength({ min: 8, max: 15 })
    .withMessage("El teléfono debe tener entre 8 y 15 dígitos"),
];

export const loginValidations = [
  body("username")
    .notEmpty()
    .withMessage("el nombre de usuario es obligatorio"),
  body("password")
    .notEmpty()
    .withMessage("el nombre de usuario es obligatorio"),
  ,
];
