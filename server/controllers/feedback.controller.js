const { StatusCodes } = require("http-status-codes");
const Feedback = require("../models/feedbackModel");
const getRatingAverage = require("../utils/getRatingAverage");

const feedbackCtrl = {
  addFeedback: async (req, res) => {
    const { added_by, course, text, rating } = req.body;
    try {
      if (!added_by || !course || !text || !rating) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Missing Fields" });
      } else {
        const newFeedback = new Feedback({
          added_by,
          course,
          text,
          rating,
        });
        await newFeedback.save();
        return res
          .status(StatusCodes.OK)
          .json({ msg: "Feedback added successfully", feedback: newFeedback });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getAllFeedbacks: async (req, res) => {
    try {
      const feedbacks = await Feedback.find()
        .populate("added_by", "-password")
        .populate("course");
      if (feedbacks.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No feedback found!" });
      } else {
        return res.status(StatusCodes.OK).json(feedbacks);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getFeedbackByCourseId: async (req, res) => {
    const { courseId } = req.params;
    try {
      const findFeedback = await Feedback.find({ course: courseId })
        .populate("added_by", "-password")
        .populate("course");
      if (findFeedback.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No feedback found!" });
      } else {
        return res.status(StatusCodes.OK).json(findFeedback);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getFeedbackByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const findFeedback = await Feedback.find({ added_by: userId })
        .populate("added_by", "-password")
        .populate("course");
      if (findFeedback.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No feedback found!" });
      } else {
        return res.status(StatusCodes.OK).json(findFeedback);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getFeedbackById: async (req, res) => {
    const { id } = req.params;
    try {
      const findFeedback = await Feedback.findById(id)
        .populate("added_by", "-password")
        .populate("course");
      if (findFeedback.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No feedback found!" });
      } else {
        return res.status(StatusCodes.OK).json(findFeedback);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  deleteFeedbackById: async (req, res) => {
    const { id } = req.params;
    try {
      await Feedback.findByIdAndDelete(id);
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Feedback deleted successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getAverageRating: async (req, res) => {
    const { courseId } = req.params;
    try {
      const findFeedback = await Feedback.find({ course: courseId });
      const average = getRatingAverage(findFeedback);
      return res.status(StatusCodes.OK).json({ rating: average });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};

module.exports = feedbackCtrl;
