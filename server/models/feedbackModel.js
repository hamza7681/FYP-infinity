const mongoose = require("mongoose");

const Feedback = new mongoose.Schema(
  {
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedback", Feedback);
