const mongoose = require("mongoose");

const NotificationModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    action_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notification", NotificationModel);
