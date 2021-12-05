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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token_secret = process.env.JWT_TOKEN_SECRET || "";
const characters = [
    'A', 'B', 'C', '0', 'D', '1', 'E', 'F', 'G',
    '2', 'H', 'I', '3', 'J', 'K', '4', 'l', 'M',
    'N', '5', 'O', 'P', '6', 'Q', 'R', 'S', '7',
    'T', 'U', 'V', '8', 'W', '9', 'X', 'Y', 'Z', 'A'
];
function hashpass(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const password_hash = yield bcrypt.hash(password, 10);
        return password_hash;
    });
}
function comparepass(password, hasspass) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield bcrypt.compare(password, hasspass)) {
            return true;
        }
        return false;
    });
}
function JWT(user) {
    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
    }, token_secret, { expiresIn: '1h' });
    return token;
}
function refreshToken(user) {
    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        refreshToken: 1
    }, token_secret);
    return token;
}
//auto generateCode
function generateRegCode() {
    let regCode = "";
    for (let i = 0; i < 10; i++) {
        const rand = Math.floor(Math.random() * characters.length);
        regCode = regCode + characters[rand];
    }
    ;
    return regCode;
}
;
// check token is valid or not
function authentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const autHeader = req.headers["authorization"];
        const token = autHeader && autHeader.split(' ')[1];
        if (!token) {
            res.sendStatus(401);
        }
        else {
            try {
                const user = yield jwt.verify(token, process.env.JWT_TOKEN_SECRET || "");
                if (user.refreshToken) {
                    res.json({ staus: 400, error: "please enter token !!" });
                }
                else {
                    next();
                }
            }
            catch (error) {
                res.json({ status: 400, error: "token is expired" });
            }
        }
    });
}
exports.default = { hashpass, comparepass, JWT, authentication, refreshToken, generateRegCode };
