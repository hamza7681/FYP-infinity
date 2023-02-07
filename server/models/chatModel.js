const mongoose = require("mongoose");

const chatModel = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chat", chatModel);
