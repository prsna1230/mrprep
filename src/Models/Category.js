const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    categoryDescription: {
      type: String,
      required: true,
      trim: true,
    },
    categoryImageUrl: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    exam: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = { CategoryModel };
