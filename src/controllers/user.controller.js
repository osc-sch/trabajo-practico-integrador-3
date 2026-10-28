import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    // const { username, email, password, profile } = matchedData(req, {
    //   locations: ["body"],
    // });

    const { username, email, password, profile } = req.body;

    console.log({ username, email, password, profile });

    // const user = await UserModel.create({ username, email, password, profile });

    return res.status(201).json({ msg: "usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({
      deletedAt: null,
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const getAllById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserModel.find({
      deletedAt: null,
      _id: id,
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
