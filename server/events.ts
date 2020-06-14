import {
  CONNECTION,
  JOIN,
  MESSAGE,
  ROOMSTATUS,
  SENDMESSAGE,
  TYPING,
  TYPINGSTATUS,
  DISCONNECT,
  ADMIN,
} from "./constants";
import { Socket } from "socket.io";
import { io } from "./setup";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users";

const typers: { [key: string]: boolean } = {};

// Helper functions
const getNumTypers = (socketId: string, typers: { [key: string]: boolean }) => {
  let numTypers = 0;
  Object.keys(typers).forEach((key) => {
    if (key !== socketId && typers[key] === true) {
      numTypers++;
    }
  });
  return numTypers;
};

// Send a message out to the client
const emitMessage = (user: string, text: string, socket: Socket) => {
  socket.emit(MESSAGE, {
    user,
    text,
  });
};

// Send out a message to all the users in room except the origin user
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

//Send out data about number of users in room to every user
const emitRoomStatus = (chatRoom: string) => {
  io.to(chatRoom).emit(ROOMSTATUS, {
    room: chatRoom,
    users: getUsersInRoom(chatRoom),
  });
};

// Send a message to everyone in the room
const emitMessageToRoom = (chatRoom: string, user: string, text: string) => {
  io.to(chatRoom).emit(MESSAGE, {
    user,
    text,
  });
};

// Socket wrapper functions

// Send typing data to every user in the room except the origin user
const typingStatus = (socket: Socket) => {
  socket.on(
    TYPING,
    (data: { user: string; chatRoom: string; typing: boolean }) => {
      const { user, chatRoom, typing } = data;
      typers[socket.id] = typing;
      socket.broadcast.to(chatRoom).emit(TYPINGSTATUS, {
        user,
        typing,
        numTypers: getNumTypers(socket.id, typers),
      });
    }
  );
};

// Wrapper to send a message to everyone in the room along with origin user data
const sendMessage = (socket: Socket) => {
  socket.on(SENDMESSAGE, (message: string, callback: () => void) => {
    const { name: userName, room: chatRoom } = getUser(socket.id);

    emitMessageToRoom(chatRoom, userName, message);
    callback();
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
      typingStatus(socket);
      console.log("Client has disconnected");
    }
  });
};

const onConnection = () => {
  io.on(CONNECTION, (socket: Socket) => {
    onJoin(socket);
    typingStatus(socket);
    sendMessage(socket);
    onDisconnect(socket);
  });
};

const startSocketEvents = () => {
  onConnection();
};

export default startSocketEvents;
