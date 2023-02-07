const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const { StatusCodes } = require("http-status-codes");

const chatCtrl = {
  createChat: async (req, res) => {
    const { senderId, recieverId } = req.body;
    try {
      const chat = await Chat.findOne({
        $and: [
          { members: { $in: [senderId] } },
          { members: { $in: [recieverId] } },
        ],
      });
      if (chat) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ msg: "Chat already has been created with this user!" });
      } else {
        const newChat = new Chat({
          members: [senderId, recieverId],
        });
        const inbox = await newChat.save();
        return res
          .status(StatusCodes.OK)
          .json({ inbox, msg: "Chat created with this user." });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getUserChat: async (req, res) => {
    const id = req.params.userid;
    try {
      const chat = await Chat.find({
        members: { $in: [id] },
      });
      if (chat) {
        return res.status(StatusCodes.OK).json(chat);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No chats found!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  findChat: async (req, res) => {
    const firstId = req.params.firstId;
    const secondId = req.params.secondId;
    try {
      const chat = await Chat.findOne({
        members: { $all: [firstId, secondId] },
      });
      if (chat) {
        return res.status(StatusCodes.OK).json(chat);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No chat found!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  createMessage: async (req, res) => {
    const data = req.body.data;
    let newData = JSON.parse(data);
    const { chatId, senderId, text } = newData;
    const file = req.file;
    try {
      if (file === undefined || file === null) {
        const newMessage = new Message({
          chatId,
          senderId,
          text,
          media: null,
        });
        const message = await newMessage.save();
        return res.status(StatusCodes.OK).json(message);
      } else {
        const newMessage = new Message({
          chatId,
          senderId,
          text,
          media: `http://localhost:5000/${file.path}`,
        });
        const message = await newMessage.save();
        return res.status(StatusCodes.OK).json(message);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getMessagesByChatId: async (req, res) => {
    const id = req.params.chatId;
    try {
      const result = await Message.find({ chatId: id });
      if (result) {
        return res.status(StatusCodes.OK).json(result);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "There are no messages in this chat!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};

module.exports = chatCtrl;
