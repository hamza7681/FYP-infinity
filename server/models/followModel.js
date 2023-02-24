const mongoose = require("mongoose");

const followModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("followers", followModel);
