import {
  CONNECTION,
  JOIN,
  MESSAGE,
  ROOMSTATUS,
  SENDMESSAGE,
  DISCONNECT,
} from "./constants";
import { Socket } from "socket.io";
import { io } from "./setup";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users";

const emitMessage = (user, text, socket) => {
  socket.emit(MESSAGE, {
    user,
    text,
  });
};

const broadcastMessage = (chatRoom, user, text, socket) => {
  socket.broadcast.to(chatRoom).emit(MESSAGE, {
    user,
    text,
  });
};

const sendMessage = (socket) => {
  socket.on(SENDMESSAGE, (message: string, callback: () => void) => {
    const { name: userName, room: chatRoom } = getUser(socket.id);

    emitMessageToRoom(chatRoom, userName, message);
    callback();
  });
};

const emitRoomStatus = (chatRoom) => {
  io.to(chatRoom).emit(ROOMSTATUS, {
    room: chatRoom,
    users: getUsersInRoom(chatRoom),
  });
};

const emitMessageToRoom = (chatRoom, user, text) => {
  io.to(chatRoom).emit(MESSAGE, {
    user,
    text,
  });
};

const onJoin = (socket) => {
  socket.on(JOIN, ({ name, room }, callback) => {
    const { error, newUser } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    if (newUser) {
      const { name: userName, room: chatRoom } = newUser;
      socket.join(chatRoom);
      emitMessage("chat master", `${userName}, welcome to ${chatRoom}`, socket);
      broadcastMessage(
        chatRoom,
        "chat master",
        `${userName} has joined the room`,
        socket
      );

      emitRoomStatus(chatRoom);

      callback();
      console.log("New client connected");
    }
  });
};

const onDisconnect = (socket) => {
  socket.on(DISCONNECT, () => {
    const { removedUser, error } = removeUser(socket.id);

    if (removedUser) {
      const { name: userName, room: chatRoom } = removedUser;

      emitMessageToRoom(chatRoom, "chat master", `${userName} left`);
      emitRoomStatus(chatRoom);
      console.log("Client has disconnected");
    }
  });
};

const onConnection = () => {
  io.on(CONNECTION, (socket: Socket) => {
    onJoin(socket);
    sendMessage(socket);
    onDisconnect(socket);
  });
};

const startSocketEvents = () => {
  onConnection();
};

export default startSocketEvents;
