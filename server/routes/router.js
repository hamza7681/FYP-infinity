const router = require("express").Router();

router.use("/auth", require("./user.routes"));
router.use("/chat", require("./chat.routes"));
router.use("/category", require("./category.routes"));
router.use("/course", require("./course.routes"));

module.exports = router;
