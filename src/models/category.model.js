import { Schema, model } from "mongoose";

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

categorySchema.set("toJSON", { virtuals: true });
categorySchema.set("toObject", { virtuals: true });

categorySchema.virtual("categories", {
  ref: "Event",
  localField: "_id",
  foreignField: "categories",
});

export const CategoryModel = model("Category", categorySchema);
