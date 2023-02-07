const router = require("express").Router();

router.use("/auth", require("./user.routes"));
router.use("/chat", require("./chat.routes"));

module.exports = router;
