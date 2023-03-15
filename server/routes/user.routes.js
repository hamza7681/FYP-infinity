const {
  register,
  login,
  forgot,
  reset,
  getProfile,
  allUsers,
  getUser,
  searchUser,
  getDashboard,
  adminLogin,
  getTutors,
  getTutorById,
  deleteTutorById,
  getStudents,
  updateProfile,
  updateProfileStatus,
  updateDp,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const dpImageUpload = require("../middlewares/dp.middleware");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgot);
router.patch("/reset", auth, reset);
router.get("/get-profile", auth, getProfile);
router.get("/all-users", auth, allUsers);
router.get("/get-user/:id", auth, getUser);
router.get("/search-user", auth, searchUser);
router.get("/dashboard", getDashboard);
router.post("/admin-login", adminLogin);
router.get("/get-tutors", getTutors);
router.get("/get-tutor-id/:id", getTutorById);
router.delete("/delete-tutor/:id", auth, deleteTutorById);
router.get("/get-students", getStudents);
router.patch("/update-profile", auth, updateProfile);
router.patch("/update-profile-status", auth, updateProfileStatus);
router.patch("/update-dp", auth, dpImageUpload.single("dp"), updateDp);

module.exports = router;
