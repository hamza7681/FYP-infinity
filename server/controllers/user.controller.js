const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { tokenGenerator } = require("../utils/tokenGenerator");
const EmailSender = require("../utils/emailSender");
const Follow = require("../models/followModel");
const moment = require("moment");
const Order = require("../models/orderModel");
const Course = require("../models/courseModel");

const userCtrl = {
  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      if (!firstName || !lastName || !email || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Please fill all fields" });
      } else {
        const findUser = await User.findOne({ email: email });
        if (findUser) {
          return res
            .status(StatusCodes.CONFLICT)
            .json({ msg: "This email is already exist!" });
        } else if (password.length < 6) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Password must be atleast 6 characters long" });
        } else {
          const hashPassword = await bcrypt.hash(password, 12);
          const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
          });
          await newUser.save();
          return res
            .status(StatusCodes.OK)
            .json({ msg: "User register successfully" });
        }
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Please fill all fields" });
      } else {
        const findUser = await User.findOne({ email: email });
        if (findUser.role === 1) {
          return res
            .status(StatusCodes.FORBIDDEN)
            .json({ msg: "Admin can't login here!" });
        } else {
          if (findUser) {
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (isMatch) {
              const token = await tokenGenerator(findUser.id);
              return res
                .status(StatusCodes.OK)
                .json({ msg: "Login Successfully", token: token });
            } else {
              return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "Incorrect Email or Password" });
            }
          } else {
            return res
              .status(StatusCodes.NOT_FOUND)
              .json({ msg: "User not found!" });
          }
        }
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  adminLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Please fill all fields" });
      } else {
        const findUser = await User.findOne({ email: email });
        if (findUser) {
          if (findUser.role === 1) {
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (isMatch) {
              const token = await tokenGenerator(findUser.id);
              return res
                .status(StatusCodes.OK)
                .json({ msg: "Login Successfully", token: token });
            } else {
              return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "Incorrect Email or Password" });
            }
          } else {
            return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ msg: "Only Admin can login!" });
          }
        } else {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: "User not found!" });
        }
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  forgot: async (req, res) => {
    const { email } = req.body;
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    try {
      if (!email) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Please enter email" });
      } else if (!regex.test(email)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Invalid Email" });
      } else {
        const findUser = await User.findOne({ email: email });
        if (findUser) {
          const token = await tokenGenerator(findUser.id);
          const url = `http://localhost:3000/reset/${token}`;
          await EmailSender(
            email,
            "Reset Password",
            "Reset Password",
            "Click here to reset password",
            "Reset",
            url
          );
          return res.status(StatusCodes.OK).json({
            msg: "Email has been send successfully. Check your inbox",
          });
        } else {
          return res.status(StatusCodes.NOT_FOUND).json({
            msg: "No account found against this email!",
          });
        }
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  reset: async (req, res) => {
    const { password } = req.body;
    try {
      if (!password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Please filled empty password field" });
      } else if (password.length < 6) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Password must be atleast 6 characters long" });
      } else {
        const hashPassword = await bcrypt.hash(password, 12);
        await User.findByIdAndUpdate(req.user, { password: hashPassword });
        return res
          .status(StatusCodes.OK)
          .json({ msg: "Password has been reset successfully" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getProfile: async (req, res) => {
    const id = req.user;
    try {
      let profile = await User.findById(id).select("-password");
      const followers = await Follow.find({ following: id }).populate(
        "user",
        "-password"
      );
      const newProfile = {
        _id: profile._id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        dp: profile.dp,
        role: profile.role,
        description: profile.description,
        website: profile.website,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        qualification: profile.qualification,
        subject: profile.subject,
        visibility: profile.visibility,
        __v: profile.__v,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
        followers: followers,
      };
      if (profile) {
        return res.status(StatusCodes.OK).json({ user: newProfile });
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "Something went wrong!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  updateProfile: async (req, res) => {
    const {
      firstName,
      lastName,
      qualification,
      facebook,
      linkedin,
      website,
      subject,
      description,
    } = req.body;
    const id = req.user;
    try {
      await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        qualification,
        facebook,
        linkedin,
        website,
        subject,
        description,
      });
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Profile updated Successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  updateProfileStatus: async (req, res) => {
    const { visibility } = req.body;
    const id = req.user;
    try {
      await User.findOneAndUpdate(id, { visibility });
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Profile visibility updated Successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  allUsers: async (req, res) => {
    try {
      const id = req.user;
      const users = await User.find({ _id: { $ne: id } }).select("-password");
      if (users) {
        return res.status(StatusCodes.OK).json(users);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No users found!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findOne({ _id: id }).select("-password");
      if (user) {
        return res.status(StatusCodes.OK).json(user);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No user found!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  searchUser: async (req, res) => {
    const searchQuery = req.query.search;
    try {
      const users = await User.find({
        $or: [
          { firstName: { $regex: searchQuery, $options: "i" } },
          { email: { $regex: searchQuery, $options: "i" } },
        ],
      }).select("-password");
      if (users.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No users found!" });
      } else {
        return res.status(StatusCodes.OK).json(users);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },

  getTutors: async (req, res) => {
    try {
      const tutors = await User.find({ role: 2 }).select("-password");
      return res.status(StatusCodes.OK).json(tutors);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },

  getTutorById: async (req, res) => {
    const id = req.params.id;
    try {
      const tutor = await User.findById(id).select("-password");
      if (tutor) {
        return res.status(StatusCodes.OK).json(tutor);
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getStudents: async (req, res) => {
    try {
      const tutors = await User.find({ role: 0 }).select("-password");
      return res.status(StatusCodes.OK).json(tutors);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },

  deleteTutorById: async (req, res) => {
    const id = req.params.id;
    try {
      await User.findByIdAndDelete(id);
      return res
        .status(StatusCodes.OK)
        .json({ msg: "Tutor deleted successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getDashboard: async (req, res) => {
    const startDate = moment("2023-01-01");
    const endDate = moment("2023-12-31");
    const pipeline = [
      {
        $match: {
          role: 0,
          createdAt: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
          createdAt: { $min: "$createdAt" },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ];
    const pipeline2 = [
      {
        $match: {
          role: 2,
          createdAt: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
          createdAt: { $min: "$createdAt" },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ];
    const pipeline3 = [
      {
        $match: {
          createdAt: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
          createdAt: { $min: "$createdAt" },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ];
    const pipeline4 = [
      {
        $match: {
          createdAt: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
          createdAt: { $min: "$createdAt" },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ];
    try {
      const studentsPerMonth = await User.aggregate(pipeline);
      const tutorsPerMonth = await User.aggregate(pipeline2);
      const orders = await Order.aggregate(pipeline3);
      const courses = await Course.aggregate(pipeline4);
      let obj = {
        students: studentsPerMonth,
        tutors: tutorsPerMonth,
        orders: orders,
        courses: courses,
      };
      return res.status(StatusCodes.OK).json(obj);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
