const { app, server, io, PORT } = require("./setup");
const router = require("./router");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

io.on("connection", socket => {
  console.log("New client connected");

  socket.on("join", ({ name, room }, callback) => {
    const { error, newUser: user } = addUser({ id: socket.id, name, room });
    const { name: userName, room: chatRoom } = user;

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${userName}, welcome to ${chatRoom}`
    });
    socket.broadcast.to(chatRoom).emit("message", {
      user: "admin",
      text: `${userName} has joined the room`
    });

    socket.join(chatRoom);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(chatRoom).emit("message", { user: userName, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
