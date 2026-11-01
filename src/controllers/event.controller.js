import { matchedData } from "express-validator";
import { EventModel } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const dataEvent = matchedData(req, { locations: ["body"] });

    await EventModel.create({ ...dataEvent });
    return res.status(201).json({ msg: "Evento creado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const events = await EventModel.find().populate("categories", "-_id");
    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await EventModel.find({ _id: id });
    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const datavalida = matchedData(req, { locations: ["body"] });

    const updatedEvent = await EventModel.findByIdAndUpdate(
      { _id: id },
      { $set: { ...datavalida } },
      { returnDocument: true, runValidators: true },
    );

    return res
      .status(200)
      .json({ msg: "El evento se a actualizado correctamente", updatedEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEvent = await EventModel.findByIdAndDelete(
      { _id: id },
      { returnDocument: true },
    );

    return res
      .status(200)
      .json({ msg: "El evento se a eliminado correctamente", updatedEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};
