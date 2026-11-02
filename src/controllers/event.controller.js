import { matchedData } from "express-validator";
import { EventModel } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const { user_id } = req.user;
    const dataEvent = matchedData(req, { locations: ["body"] });

    if (new Date(dataEvent.endDate) <= new Date(dataEvent.startDate)) {
      return res.status(400).json({
        msg: "La fecha de finalización debe ser posterior a la de inicio",
      });
    }

    await EventModel.create({ ...dataEvent, organizer: user_id });
    return res.status(201).json({ msg: "Evento creado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const events = await EventModel.find()
      .populate("organizer", "-password")
      .populate("categories", "-_id");
    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await EventModel.find({ _id: id })
      .populate("organizer", "-password")
      .populate("categories", "-_id");

    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno en el servidor" });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const { user_id } = req.user;
    const events = await EventModel.find({ organizer: user_id })
      .populate("organizer", "-password")
      .populate("categories", "-_id");
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

    if (datavalida.startDate || datavalida.endDate) {
      const event = await EventModel.findById(id).select(
        "startDate endDate",
      );

      if (event) {
        const startDate = datavalida.startDate ?? event.startDate;
        const endDate = datavalida.endDate ?? event.endDate;

        if (new Date(endDate) <= new Date(startDate)) {
          return res.status(400).json({
            msg: "La fecha de finalización debe ser posterior a la de inicio",
          });
        }
      }
    }

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
