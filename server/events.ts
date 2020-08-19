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
import {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getTypingUsers,
  setTypingUser,
} from "./users";

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

// Send out typing indicator message to all users in room except sender
const broadcastTypingMessage = (
  socket: Socket,
  chatRoom: string,
  typingIndicatorMessage: string
) => {
  socket.broadcast.to(chatRoom).emit(TYPINGSTATUS, {
    typingMessage: typingIndicatorMessage,
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
      setTypingUser(socket.id, typing);

      // Get total number of users that are typing other than myself
      const typers = getTypingUsers(socket.id);
      let typingIndicatorMessage: string;

      if (typers.length >= 2) {
        typingIndicatorMessage = "Several people are typing...";
      } else if (!typing) {
        typingIndicatorMessage = "";
      } else {
        typingIndicatorMessage = `${user} is typing...`;
      }

      broadcastTypingMessage(socket, chatRoom, typingIndicatorMessage);
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
  socket.on(JOIN, ({ name, room, isTyping }, callback) => {
    const { error, newUser } = addUser({ id: socket.id, name, room, isTyping });

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
      broadcastTypingMessage(socket, chatRoom, "");
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
