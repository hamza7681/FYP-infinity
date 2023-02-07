const mongoose = require("mongoose");

const messageModel = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    media: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", messageModel);
