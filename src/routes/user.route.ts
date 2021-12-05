const express = require('express')
import userController from '../controller/user.controller';
import userService from '../service/user.service';

const router = express.Router();

router.post('/register', userController.Register);
router.post('/login', userController.Login)
//User use token to get another token
router.post('/token', userController.refreshToken)
//check login 
router.post('/check-login',userService.authentication, userController.check_login );

export default router;

