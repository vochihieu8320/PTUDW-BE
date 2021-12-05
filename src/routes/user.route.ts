const express = require('express')
import userController from '../controller/user.controller';
import userService from '../service/user.service';

const router = express.Router();

router.post('/forgot-pwd', userController.forgot_pwd)

export default router;

