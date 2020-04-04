const { app, server, io, cors, PORT } = require("./setup");
const router = require("./router");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

io.on("connect", (socket) => {
  console.log("New client connected");

  socket.on("join", ({ name, room }, callback) => {
    const {
      error,
      newUser: { name: userName, room: chatRoom },
    } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    socket.join(chatRoom);

    socket.emit("message", {
      user: "admin",
      text: `${userName}, welcome to ${chatRoom}`,
    });
    socket.broadcast.to(chatRoom).emit("message", {
      user: "admin",
      text: `${userName} has joined the room`,
    });

    io.to(chatRoom).emit("roomData", {
      room: chatRoom,
      users: getUsersInRoom(chatRoom),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const { name: userName, room: chatRoom } = getUser(socket.id);

    io.to(chatRoom).emit("message", { user: userName, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const { name: userName, room: chatRoom } = removeUser(socket.id);

    if (!!userName && !!chatRoom) {
      io.to(chatRoom).emit("message", {
        user: "admin",
        text: `${userName} has left`,
      });
      io.to(chatRoom).emit("roomData", {
        room: chatRoom,
        users: getUsersInRoom(chatRoom),
      });
    }
    console.log("Client disconnected");
  });
});

app.use(cors());
app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
