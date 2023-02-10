const {
  addCourse,
  getCourses,
  getCoursesByUserId,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const auth = require("../middlewares/auth.middleware");
const courseImageUpload = require("../middlewares/courseImage.middleware");
const router = require("express").Router();

router.post("/add-course", auth, courseImageUpload.single("image"), addCourse);
router.get("/get-course", getCourses);
router.get("/courses-by-userId/:id", getCoursesByUserId);
router.get("/course-by-id/:id", getCourseById);
router.patch(
  "/update-course/:id",
  courseImageUpload.single("image"),
  updateCourse
);
router.delete("/delete-course/:id", deleteCourse);

module.exports = router;
