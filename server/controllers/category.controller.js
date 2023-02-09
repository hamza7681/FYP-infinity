const { StatusCodes } = require("http-status-codes");
const Category = require("../models/categoryModel");

const categoryCtrl = {
  addCategory: async (req, res) => {
    const { name } = req.body;
    try {
      const find = await Category.findOne({ name: name });
      if (find) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ msg: "This category is already exist!" });
      } else {
        const newCat = new Category({
          name,
        });
        const category = await newCat.save();
        return res
          .status(StatusCodes.OK)
          .json({ msg: "Category Added", category: category });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getCategories: async (req, res) => {
    try {
      const result = await Category.find();
      if (result.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No Categories Found!" });
      } else {
        return res.status(StatusCodes.OK).json(result);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
      await Category.findByIdAndUpdate(id, { name });
      return res.status(StatusCodes.OK).json({ msg: "Category Updated" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  deletCategory: async (req, res) => {
    const id = req.params.id;
    try {
      await Category.findByIdAndDelete(id);
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Category deleted successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};
module.exports = categoryCtrl;
