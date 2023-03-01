const {
  addNotification,
  getNotification,
  getNotificationByActive,
  deleteNotification,
  updateStatus,
  markedAllRead,
} = require("../controllers/notification.controller");
const router = require("express").Router();

router.post("/add-notification", addNotification);
router.get("/get-notification", getNotification);
router.get("/get-active-notification", getNotificationByActive);
router.delete("/delete-notification/:id", deleteNotification);
router.patch("/update-status/:id", updateStatus);
router.patch("/marked-all-read", markedAllRead);

module.exports = router;
