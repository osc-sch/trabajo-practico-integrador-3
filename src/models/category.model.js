import { Schema, Types, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    description: {
      type: String,
      required: false,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CategoryModel = model("Category", categorySchema);
