const { StatusCodes } = require("http-status-codes");
const Course = require("../models/courseModel");

const courseCtrl = {
  addCourse: async (req, res) => {
    const data = req.body.data;
    let newData = JSON.parse(data);
    const {
      title,
      title_desc,
      language,
      price,
      category,
      description,
      created_by,
    } = newData;
    const file = req.file;
    try {
      if (
        !title ||
        !title_desc ||
        !language ||
        !price ||
        !category ||
        !description ||
        !created_by ||
        file === undefined
      ) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Missing Fields" });
      } else {
        const newCourse = new Course({
          title,
          title_desc,
          language,
          price,
          category,
          description,
          created_by,
          image: `https://infinity-server.herokuapp.com//${file.path}`,
        });
        await newCourse.save();
        return res.status(StatusCodes.OK).json({ msg: "Course Added" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getCourses: async (req, res) => {
    try {
      const result = await Course.find()
        .populate("category")
        .populate("created_by", "firstName lastName");
      if (result.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No Course found!" });
      } else {
        return res.status(StatusCodes.OK).json(result);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getCoursesByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Course.find({ created_by: id }).populate(
        "created_by",
        "firstName lastName"
      );
      if (result.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No Course found!" });
      } else {
        return res.status(StatusCodes.OK).json(result);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getCourseById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Course.findById(id)
        .populate("category")
        .populate("created_by", "firstName lastName");
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  updateCourse: async (req, res) => {
    const id = req.params.id;
    const data = req.body.data;
    let newData = JSON.parse(data);
    const {
      title,
      title_desc,
      language,
      price,
      category,
      description,
      created_by,
    } = newData;
    const file = req.file;
    try {
      if (file !== undefined) {
        await Course.findByIdAndUpdate(id, {
          title,
          title_desc,
          language,
          price,
          category,
          description,
          created_by,
          image: `https://infinity-server.herokuapp.com//${file.path}`,
        });
      } else {
        await Course.findByIdAndUpdate(id, {
          title,
          title_desc,
          language,
          price,
          category,
          description,
          created_by,
        });
      }
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Course updated successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  deleteCourse: async (req, res) => {
    const id = req.params.id;
    try {
      await Course.findByIdAndDelete(id);
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Course deleted successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};

module.exports = courseCtrl;
