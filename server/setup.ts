const express = require("express");
const socketio = require("socket.io");
const http = require("http");
export const cors = require("cors");

export const PORT = process.env.PORT || 5000;

export const app = express();
export const server = http.createServer(app);
export const io = socketio(server);
