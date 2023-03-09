const mongoose = require("mongoose");

const orderModel = new mongoose.Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    ordered_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderModel);
