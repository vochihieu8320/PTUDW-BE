"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const user_service_1 = __importDefault(require("../service/user.service"));
const router = express.Router();
router.post('/register', user_controller_1.default.Register);
router.post('/login', user_controller_1.default.Login);
//User use token to get another token
router.post('/token', user_controller_1.default.refreshToken);
//check login 
router.post('/check-login', user_service_1.default.authentication, user_controller_1.default.check_login);
exports.default = router;
