const {
  addFollower,
  getFollowingsByUserId,
  getFollowersByTutorId,
} = require("../controllers/follow.controller");
const auth = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.post("/add-follower", auth, addFollower);
router.get("/get-followers-userId/:id", auth, getFollowingsByUserId);
router.get("/get-followers-tutorId/:id", auth, getFollowersByTutorId);

module.exports = router;
