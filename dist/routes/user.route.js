"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const router = express.Router();
router.post('/forgot-pwd', user_controller_1.default.forgot_pwd);
router.post('/change-pwd', user_controller_1.default.changePwd);
exports.default = router;
