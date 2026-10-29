import { matchedData } from "express-validator";
import { EventModel } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const dataEvent = matchedData(req, { locations: ["body"] });
    console.log(dataEvent);

    await EventModel.create({ ...dataEvent });
    return res.status(201).json({ msg: "Evento creado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const events = await EventModel.find();
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
