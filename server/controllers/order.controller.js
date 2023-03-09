const { StatusCodes } = require("http-status-codes");
const Order = require("../models/orderModel");

const orderCtrl = {
  addOrder: async (req, res) => {
    const { totalPrice, ordered_by, product, card, card_number } = req.body;
    try {
      if (
        !totalPrice ||
        !ordered_by ||
        !product.length === 0 ||
        !card ||
        !card_number
      ) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Missing details" });
      } else {
        const newOrder = new Order({
          totalPrice: totalPrice,
          ordered_by,
          product: product,
          card,
          card_number,
        });
        await newOrder.save();
        return res
          .status(StatusCodes.OK)
          .json({ msg: "Order booked successfully" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("ordered_by", "-password")
        .populate("product");
      return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getOrdersById: async (req, res) => {
    const id = req.params.id;
    try {
      const orders = await Order.findById(id)
        .populate("ordered_by", "-password")
        .populate("product");
      return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getOrdersByUserId: async (req, res) => {
    const id = req.params.id;
    try {
      const orders = await Order.find({ ordered_by: id })
        .populate("ordered_by", "-password")
        .populate("product");
      return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  deleteOrderById: async (req, res) => {
    const id = req.params.id;
    try {
      await Order.findByIdAndDelete(id);
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Order deleted successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};

module.exports = orderCtrl;
