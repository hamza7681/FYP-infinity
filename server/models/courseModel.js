const mongoose = require("mongoose");

const CourseModel = new mongoose.Schema(
  {
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("courses", CourseModel);
