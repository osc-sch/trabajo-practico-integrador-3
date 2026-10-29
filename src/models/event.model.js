import { Schema, Types, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      integer: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "finished"],
      default: "scheduled",
    },
    location: {
      venue: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
      },
      address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150,
      },
      city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
      },
    },
    organizer: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: [
      {
        type: Types.ObjectId,
        ref: "Category",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const EventModel = model("Event", eventSchema);
