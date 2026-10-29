import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";
import { flatten } from "flat";

export const createUser = async (req, res) => {
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({
      deleteAt: null,
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getAllById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserModel.find({
      _id: id,
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const dataValida = matchedData(req, { locations: ["body"] });

    const flattenedData = flatten(dataValida);

    const userUpdated = await UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: { ...flattenedData } },
      { returnDocument: "after" },
    );

    return res
      .status(200)
      .json({ msg: "El usuario fue editado exitozamente", userUpdated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const deletUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const userUpdated = await UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: { deleteAt: new Date() } },
      { returnDocument: "after" },
    );

    return res
      .status(200)
      .json({ msg: "El usuario fue eliminado exitozamente", userUpdated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};
