const { app, server, io, cors, PORT } = require("./setup");
const router = require("./router");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, newUser } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    if (newUser) {
      const { name: userName, room: chatRoom } = newUser;
      socket.join(chatRoom);

      socket.emit("message", {
        user: "chat master",
        text: `${userName}, welcome to ${chatRoom}`,
      });
      socket.broadcast.to(chatRoom).emit("message", {
        user: "chat master",
        text: `${userName} has joined the room`,
      });

      io.to(chatRoom).emit("roomData", {
        room: chatRoom,
        users: getUsersInRoom(chatRoom),
      });

      callback();
      console.log("New client connected");
    }
  });

  socket.on("sendMessage", (message, callback) => {
    const { name: userName, room: chatRoom } = getUser(socket.id);

    io.to(chatRoom).emit("message", { user: userName, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const removedUser = removeUser(socket.id);

    if (removedUser) {
      const { name: userName, room: chatRoom } = removedUser;

      io.to(chatRoom).emit("message", {
        user: "chat master",
        text: `${userName} left`,
      });
      io.to(chatRoom).emit("roomData", {
        room: chatRoom,
        users: getUsersInRoom(chatRoom),
      });
      console.log("Client has disconnected");
    }
  });
});

app.use(cors());
app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
