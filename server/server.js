require("dotenv").config();
const express = require("express");
const { connectDB } = require("./connection/config");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Database connectivity
connectDB();

//express middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/chatMedia", express.static("chatMedia/"));
app.use("/courseImages", express.static("courseImages/"));
app.use("/profileImages", express.static("profileImages/"));

//socket io
let activeUsers = [];
io.on("connection", (socket) => {
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("Connected Users", activeUsers);
    io.emit("get-users", activeUsers);
  });
  socket.on("send-message", (data) => {
    console.log(data);
    const { recieverId } = data;
    const user = activeUsers.find((user) => user.userId === recieverId);
    console.log("Sending from socket to: ", recieverId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });
});

//Routes usage
app.use(require("./routes/router"));

server.listen(port, () => {
  console.log("Server is running on port", port);
});
