import {
  CONNECTION,
  JOIN,
  MESSAGE,
  ROOMSTATUS,
  SENDMESSAGE,
  DISCONNECT,
  ADMIN,
} from "./constants";
import { Socket } from "socket.io";
import { io } from "./setup";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users";

const emitMessage = (user: string, text: string, socket: Socket) => {
  socket.emit(MESSAGE, {
    user,
    text,
  });
};

const broadcastMessage = (
  chatRoom: string,
  user: string,
  text: string,
  socket: Socket
) => {
  socket.broadcast.to(chatRoom).emit(MESSAGE, {
    user,
    text,
  });
};

const sendMessage = (socket: Socket) => {
  socket.on(SENDMESSAGE, (message: string, callback: () => void) => {
    const { name: userName, room: chatRoom } = getUser(socket.id);

    emitMessageToRoom(chatRoom, userName, message);
    callback();
  });
};

const emitRoomStatus = (chatRoom: string) => {
  io.to(chatRoom).emit(ROOMSTATUS, {
    room: chatRoom,
    users: getUsersInRoom(chatRoom),
  });
};

const emitMessageToRoom = (chatRoom: string, user: string, text: string) => {
  io.to(chatRoom).emit(MESSAGE, {
    user,
    text,
  });
};

const onJoin = (socket: Socket) => {
  socket.on(JOIN, ({ name, room }, callback) => {
    const { error, newUser } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    if (newUser) {
      const { name: userName, room: chatRoom } = newUser;
      socket.join(chatRoom);
      emitMessage(ADMIN, `${userName}, welcome to ${chatRoom}`, socket);
      broadcastMessage(
        chatRoom,
        ADMIN,
        `${userName} has joined the room`,
        socket
      );

      emitRoomStatus(chatRoom);

      callback();
      console.log("New client connected");
    }
  });
};

const onDisconnect = (socket: Socket) => {
  socket.on(DISCONNECT, () => {
    const { removedUser, error } = removeUser(socket.id);

    if (removedUser) {
      const { name: userName, room: chatRoom } = removedUser;

      emitMessageToRoom(chatRoom, ADMIN, `${userName} left`);
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
