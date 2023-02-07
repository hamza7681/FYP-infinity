const {
  createChat,
  getUserChat,
  findChat,
  createMessage,
  getMessagesByChatId,
} = require("../controllers/chat.controller");
const auth = require("../middlewares/auth.middleware");
const imageUpload = require("../middlewares/chatMedia.middleware");
const router = require("express").Router();

router.post("/create-chat", auth, createChat);
router.get("/get-user-chats/:userid", auth, getUserChat);
router.get("/find/:firstId/:secondId", auth, findChat);
router.post(
  "/create-message",
  auth,
  imageUpload.single("image"),
  createMessage
);
router.get("/get-message/:chatId", auth, getMessagesByChatId);

module.exports = router;
