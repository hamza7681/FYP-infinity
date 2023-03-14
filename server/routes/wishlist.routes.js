const {
  addWishlist,
  getWishlistByUserId,
} = require("../controllers/wishlist.controller");
const auth = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.post("/add-wishlist", auth, addWishlist);
router.get("/get-wishlist-userId", auth, getWishlistByUserId);

module.exports = router;
