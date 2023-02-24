const mongoose = require("mongoose");
const DB =
  process.env.DB_URL ||
  "mongodb+srv://hamza7681:hamzadsc7681@cluster0.ttxcq.mongodb.net/infinity?retryWrites=true&w=majority";

exports.connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(DB)
    .then(() => console.log("Successfully connected to mongodb"))
    .catch((e) => console.log("Connection Failed", e));
};
