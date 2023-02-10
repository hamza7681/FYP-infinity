const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dp: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=",
    },
    role: {
      type: Number,
      default: 0, //0 user, 1 admin, 2 tutor
    },
    description: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    qualification: {
      type: String,
      default: "",
    },
    subject: {
      type: String,
      default: "",
    },
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userModel);
