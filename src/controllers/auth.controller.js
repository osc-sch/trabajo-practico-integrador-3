import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, role, profile } = matchedData(req, {
      locations: ["body"],
    });

    const hasedPassword = await hashPassword(password);

    await UserModel.create({
      username,
      email,
      password: hasedPassword,
      role,
      profile,
    });

    return res.status(201).json({ msg: "usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = matchedData(req, { locations: ["body"] });

    const userExist = await UserModel.findOne({ username });

    if (!userExist) {
      return res.status(401).json({ msg: "credenciales ivalidas" });
    }

    const validPassword = await comparePassword(password, userExist.password);

    if (!validPassword) {
      return res.status(401).json({ msg: "credenciales ivalidas" });
    }

    const token = signToken({
      user_id: userExist._id,
      username: userExist.username,
      role: userExist.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    return res.status(201).json({ msg: "usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(201).json({ msg: "logout exitoso" });
};
