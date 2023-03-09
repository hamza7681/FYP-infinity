const {
  addOrder,
  getOrders,
  getOrdersByUserId,
  getOrdersById,
  deleteOrderById,
} = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/add-order", auth, addOrder);
router.get("/get-order", auth, getOrders);
router.get("/get-order-userId/:id", auth, getOrdersByUserId);
router.get("/get-order-id/:id", auth, getOrdersById);
router.delete("/delete-order/:id", auth, deleteOrderById);

module.exports = router;
