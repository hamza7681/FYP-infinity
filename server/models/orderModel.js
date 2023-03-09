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
      required: true,
    },
    card: {
      type: String,
      required: true,
    },
    card_number: {
      type: String,
      required: true,
    },
    
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderModel);
