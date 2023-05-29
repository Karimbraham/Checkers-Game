const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const formatMessage = require("./utils/messages");

const socketio = require("socket.io");
const io = socketio(server);

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const botName = "chatBot";

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket.emit("message", formatMessage(botName, "Welcome To ChatCore"));

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    const roomUsers = getRoomUsers(user.room);
    if (roomUsers.length === 1) {
      user.role = "r";
    } else if (roomUsers.length === 2) {
      user.role = "b";
    } else if (roomUsers.length > 2) {
      user.role = "s";
    }
    socket.emit("userRole", user.role);

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("makeMove", (moveInfo) => {
    console.log(moveInfo.number);
    const user = getCurrentUser(socket.id);
    socket.broadcast.to(user.room).emit("makeMove", moveInfo);
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      io.to(user.room).emit("checkWin", user.role);

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
