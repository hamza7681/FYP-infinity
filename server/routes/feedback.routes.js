const {
  addFeedback,
  getAllFeedbacks,
  getFeedbackByCourseId,
  getFeedbackByUserId,
  getFeedbackById,
  deleteFeedbackById,
  getAverageRating,
} = require("../controllers/feedback.controller");
const auth = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.post("/add-feedback", auth, addFeedback);
router.get("/all-feedbacks", getAllFeedbacks);
router.get("/get-feedback-course/:courseId", getFeedbackByCourseId);
router.get("/get-feedback-user/:userId", getFeedbackByUserId);
router.get("/get-feedback/:id", getFeedbackById);
router.delete("/delete-feedback/:id", auth, deleteFeedbackById);
router.get("/get-rating/:courseId", getAverageRating);

module.exports = router;
