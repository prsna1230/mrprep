const express = require("express");
const { CategoryModel } = require("../Models/Category");
const { categoryApi } = require("../constants/API_ENDPOINTS");

const categoryRouter = express.Router();

categoryRouter.post(categoryApi, async (req, res) => {
  try {
    const category = new CategoryModel(req.body);

    const addedCategory = await category.save();

    res
      .status(201)
      .send({ message: "Category added Successfully", addedCategory });
  } catch (err) {
    res.status(500).send({
      message: "category not added",
      error: err.message,
    });
  }
});

categoryRouter.get(categoryApi, async (req, res) => {
  try {
    // get all categories
    const categories = await CategoryModel.find({});
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: "Failed while fetching the categories",
      error: err.message,
    });
  }
});

module.exports = { categoryRouter };
