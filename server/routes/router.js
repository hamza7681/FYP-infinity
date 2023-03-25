const router = require("express").Router();

router.use("/auth", require("./user.routes"));
router.use("/chat", require("./chat.routes"));
router.use("/category", require("./category.routes"));
router.use("/course", require("./course.routes"));
router.use("/follow", require("./follow.routes"));
router.use("/notification", require("./notification.routes"));
router.use("/order", require("./order.routes"));
router.use("/wishlist", require("./wishlist.routes"));
router.use("/feedback", require("./feedback.routes"));

module.exports = router;
