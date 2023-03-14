const { StatusCodes } = require("http-status-codes");
const WishList = require("../models/wishlistModel");

const wishlistCtrl = {
  addWishlist: async (req, res) => {
    const { added_by, course } = req.body;
    try {
      if (!added_by || !course) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Missing field required" });
      } else {
        const findWishList = await WishList.findOne({
          $and: [{ added_by: added_by }, { course: course }],
        });
        if (findWishList) {
          await WishList.deleteOne({
            $and: [{ added_by: added_by }, { course: course }],
          });
          return res
            .status(StatusCodes.OK)
            .json({ msg: "You removed this course from wishlist" });
        } else {
          const newWish = new WishList({
            added_by,
            course,
          });
          await newWish.save();
          return res
            .status(StatusCodes.OK)
            .json({ msg: "You add this course in wishlist" });
        }
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getWishlistByUserId: async (req, res) => {
    const id = req.user;
    try {
      const wishlist = await WishList.find({ added_by: id })
        .populate("added_by").select('-password')
        .populate("course");
      return res.status(StatusCodes.OK).json(wishlist);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};

module.exports = wishlistCtrl;
