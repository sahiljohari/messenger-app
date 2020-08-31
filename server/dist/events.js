"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const setup_1 = require("./setup");
const users_1 = require("./users");
const emitMessage = (user, text, socket) => {
    socket.emit(constants_1.MESSAGE, {
        user,
        text,
    });
};
const broadcastMessage = (chatRoom, user, text, socket) => {
    socket.broadcast.to(chatRoom).emit(constants_1.MESSAGE, {
        user,
        text,
    });
};
const sendMessage = (socket) => {
    socket.on(constants_1.SENDMESSAGE, (message, callback) => {
        const { name: userName, room: chatRoom } = users_1.getUser(socket.id);
        emitMessageToRoom(chatRoom, userName, message);
        callback();
    });
};
const emitRoomStatus = (chatRoom) => {
    setup_1.io.to(chatRoom).emit(constants_1.ROOMSTATUS, {
        room: chatRoom,
        users: users_1.getUsersInRoom(chatRoom),
    });
};
const emitMessageToRoom = (chatRoom, user, text) => {
    setup_1.io.to(chatRoom).emit(constants_1.MESSAGE, {
        user,
        text,
    });
};
const onJoin = (socket) => {
    socket.on(constants_1.JOIN, ({ name, room }, callback) => {
        const { error, newUser } = users_1.addUser({ id: socket.id, name, room });
        if (error)
            return callback(error);
        if (newUser) {
            const { name: userName, room: chatRoom } = newUser;
            socket.join(chatRoom);
            emitMessage(constants_1.ADMIN, `${userName}, welcome to ${chatRoom}`, socket);
            broadcastMessage(chatRoom, constants_1.ADMIN, `${userName} has joined the room`, socket);
            emitRoomStatus(chatRoom);
            callback();
            console.log("New client connected");
        }
    });
};
const onDisconnect = (socket) => {
    socket.on(constants_1.DISCONNECT, () => {
        const { removedUser, error } = users_1.removeUser(socket.id);
        if (removedUser) {
            const { name: userName, room: chatRoom } = removedUser;
            emitMessageToRoom(chatRoom, constants_1.ADMIN, `${userName} left`);
            emitRoomStatus(chatRoom);
            console.log("Client has disconnected");
        }
    });
};
const onConnection = () => {
    setup_1.io.on(constants_1.CONNECTION, (socket) => {
        onJoin(socket);
        sendMessage(socket);
        onDisconnect(socket);
    });
};
const startSocketEvents = () => {
    onConnection();
};
exports.default = startSocketEvents;
//# sourceMappingURL=events.js.map