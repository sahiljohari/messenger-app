import express from "express";
import router from "./router";
import { app, server, io, cors, PORT } from "./setup";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users";
import { Socket } from "socket.io";

io.on("connection", (socket: Socket) => {
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

  socket.on("sendMessage", (message: string, callback: () => void) => {
    const { name: userName, room: chatRoom } = getUser(socket.id);

    io.to(chatRoom).emit("message", { user: userName, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const { removedUser, error } = removeUser(socket.id);

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

const serverErrorHandler: express.ErrorRequestHandler = (err, _, res, __) => {
  const { status = 500, ...others } = err;
  res
    .status(status)
    .json({
      status_code: status,
      ...others,
    })
    .send();
};

app.use(serverErrorHandler);

const closeServer = () => {
  console.log("Closing http server");
  server.close(() => {
    console.log("Http server closed.");
  });
};

process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);

server.on("error", (e: NodeJS.ErrnoException) => {
  if (e.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use!`);
    return;
  }
  console.error(e);
});
