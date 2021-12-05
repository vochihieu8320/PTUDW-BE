"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const db_1 = __importDefault(require("./db/db"));
const index_1 = __importDefault(require("./routes/index"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors({
    origin: process.env.Domain_Fe
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;
const httpServer = (0, http_1.createServer)(app);
//create socker server
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.Domain_Fe,
    }
});
//conect to DB
(0, db_1.default)();
//create a namspace in order to authentication socket client
const adminNamespace = io.of("/admin");
adminNamespace.on("connection", (socket) => {
    console.log(socket.id);
});
adminNamespace.use((socket, next) => {
    // ensure the user has sufficient rights
    if (socket.handshake.auth.token) {
        console.log("token", socket.handshake.auth.token);
    }
    next();
});
//clinent comunicate with socker server
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("send-messages", (messages) => __awaiter(void 0, void 0, void 0, function* () {
    }));
}));
httpServer.listen(port, () => { console.log(`commit 1`); });
(0, index_1.default)(app);
