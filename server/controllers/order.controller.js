const { StatusCodes } = require("http-status-codes");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const stripe = require("stripe")(
  "sk_test_51LZUB5DX6pMxBdqEOjZfyA4uIBhOWMLx2xpomjVvrBhk2cRUdC5wx9KtexNGD1MckEeV7kyf3GvVzpqPyEWAdSeR00JvvFtxqh"
);

const orderCtrl = {
  addOrder: async (req, res) => {
    const { totalPrice, ordered_by, product } = req.body;
    try {
      if (!totalPrice || !ordered_by || !product.length === 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Missing details" });
      } else {
        const user = await User.findOne({ _id: ordered_by });
        const newOrder = new Order({
          totalPrice: totalPrice,
          ordered_by,
          product: product,
        });
        await stripe.customers
          .create({
            email: user.email,
          })
          .then((customer) => {
            return stripe.paymentIntents
              .create({
                customer: customer.id,
                amount: totalPrice,
                currency: "usd",
                description: "One-time setup fee",
              })
              .then((invoice) => {
                console.log(invoice);
              })
              .catch((err) => {
                console.log(err);
              });
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
