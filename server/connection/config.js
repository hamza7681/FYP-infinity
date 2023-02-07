const mongoose = require("mongoose");
const DB = process.env.DB_URL;

exports.connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(DB)
    .then(() => console.log("Successfully connected to mongodb"))
    .catch((e) => console.log("Connection Failed", e));
};
