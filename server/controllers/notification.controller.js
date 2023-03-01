const { StatusCodes } = require("http-status-codes");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

const NotificationCtrl = {
  addNotification: async (req, res) => {
    const { title, action_by, section } = req.body;
    try {
      if (!title || !action_by || !section) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Missing fields" });
      } else {
        const newNotification = new Notification({
          title,
          action_by,
          section,
        });
        await newNotification.save();
        return res.status(StatusCodes.OK).json({ msg: "Notification pushed!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getNotification: async (req, res) => {
    try {
      const notification = await Notification.find().populate(
        "action_by",
        "-password"
      );
      return res.status(StatusCodes.OK).json(notification);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getNotificationByActive: async (req, res) => {
    try {
      const notification = await Notification.find({ status: true }).populate(
        "action_by",
        "-password"
      );
      return res.status(StatusCodes.OK).json(notification);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  deleteNotification: async (req, res) => {
    const id = req.params.id;
    try {
      await Notification.findByIdAndDelete(id);
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Notification deleted successfully!" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  updateStatus: async (req, res) => {
    const id = req.params.id;
    try {
      await Notification.findByIdAndUpdate(id, { status: false });
      return res.status(StatusCodes.OK).json({ msg: "Marked Read!" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  markedAllRead: async (req, res) => {
    try {
      await Notification.updateMany({}, { status: false });
      return res.status(StatusCodes.OK).json({ msg: "All notification marked as Read!" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};

module.exports = NotificationCtrl;
