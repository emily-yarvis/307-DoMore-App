import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
  },

  { collection: "categories_list" },
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;
