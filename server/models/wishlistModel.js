const mongoose = require("mongoose");

const Wishlist = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("wishlist", Wishlist);
