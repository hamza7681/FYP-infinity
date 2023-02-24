const { StatusCodes } = require("http-status-codes");
const Follow = require("../models/followModel");

const followCtrl = {
  addFollower: async (req, res) => {
    try {
      const { user, following } = req.body;
      const findFollower = await Follow.findOne({
        $and: [{ user: user }, { following: following }],
      });
      if (findFollower) {
        await Follow.findOneAndDelete({
          $and: [{ user: user }, { following: following }],
        });
        return res
          .status(StatusCodes.CONFLICT)
          .json({ msg: "You have successfully un-followed this tutor" });
      } else {
        const newFollow = new Follow({
          user,
          following,
        });
        await newFollow.save();
        return res
          .status(StatusCodes.OK)
          .json({ msg: "You have successfully followed this tutor" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getFollowingsByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      const findFollowing = await Follow.find({ user: id }).populate(
        "following",
        "-password"
      );
      if (findFollowing.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "You have not followed any Tutors!" });
      } else {
        return res.status(StatusCodes.OK).json(findFollowing);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getFollowersByTutorId: async (req, res) => {
    try {
      const id = req.params.id;
      const findFollowing = await Follow.find({ following: id }).populate(
        "user",
        "-password"
      );
      if (findFollowing.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "You have not any followers!" });
      } else {
        return res.status(StatusCodes.OK).json(findFollowing);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};

module.exports = followCtrl;
