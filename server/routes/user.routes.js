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
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgot);
router.patch("/reset", auth, reset);
router.get("/get-profile", auth, getProfile);
router.get("/all-users", auth, allUsers);
router.get("/get-user/:id", auth, getUser);
router.get("/search-user", auth, searchUser);
router.get("/dashboard/:year/:month", getDashboard);
router.post("/admin-login", adminLogin);
router.get("/get-tutors", getTutors);

module.exports = router;
