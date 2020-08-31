"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
exports.cors = require("cors");
exports.PORT = process.env.PORT || 5000;
exports.app = express();
exports.server = http.createServer(exports.app);
exports.io = socketio(exports.server);
//# sourceMappingURL=setup.js.map