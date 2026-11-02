import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model.js";
import { EventModel } from "../models/event.model.js";

export const createCategory = async (req, res) => {
  try {
    const datavalida = matchedData(req, { locations: ["body"] });

    await CategoryModel.create({ ...datavalida });

    return res.status(201).json({ msg: "Categoria creada exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    return res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.find({ _id: id }).populate("events");

    return res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const dataValida = matchedData(req, { locations: ["body"] });
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      { _id: id },
      { ...dataValida },
      {
        returnDocument: true,
      },
    );

    return res
      .status(200)
      .json({ msg: "Categoria editada exitosamente", updatedCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await EventModel.updateMany(
      { categories: id },
      { $pull: { categories: id } },
    );

    const category = await CategoryModel.findByIdAndDelete(
      { _id: id },
      { returnDocument: true },
    );

    return res
      .status(200)
      .json({ msg: "Categoria eliminada exitosamente", category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};
