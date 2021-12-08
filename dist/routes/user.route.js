"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const router = express.Router();
router.post('/register', user_controller_1.default.Register);
router.post('/login', user_controller_1.default.Login);
//User use token to get another token
router.post('/token', user_controller_1.default.refreshToken);
//check login 
router.post('/forgot-pwd', user_controller_1.default.forgot_pwd);
router.patch('/forgot-pwd', user_controller_1.default.check_forgot_pwd);
router.post('/change-pwd', user_controller_1.default.changePwd);
exports.default = router;
