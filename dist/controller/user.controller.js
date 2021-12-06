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
const user_service_1 = __importDefault(require("../service/user.service"));
const user_model_1 = __importDefault(require("../model/user.model"));
const login_model_1 = __importDefault(require("../model/login.model"));
const Validation_service_1 = __importDefault(require("../service/Validation.service"));
const jwt = require('jsonwebtoken');
class NewController {
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = Validation_service_1.default.regisValidate(req.body);
                if (error)
                    return res.status(400).send(error.details[0].message);
                const hashed = yield user_service_1.default.hashpass(req.body.password);
                user_model_1.default.create({
                    name: req.body.name,
                    phone: req.body.phone,
                    address: req.body.address,
                    email: req.body.email,
                    password: hashed
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = Validation_service_1.default.loginValidate(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            //check email
            const user = yield user_model_1.default.findOne({ email: req.body.email });
            if (user) {
                if (!user)
                    return res.status(400).send('Email is wrong');
                //check password
                const validPass = user_service_1.default.comparepass(req.body.password, user.password);
                if (!validPass)
                    return res.status(400).send('password is wrong');
                //create token
                const token = user_service_1.default.JWT(user);
                const hashedtoken = yield user_service_1.default.hashpass(token);
                res.json({
                    token: hashedtoken,
                    role: "customer"
                });
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rfToken = user_service_1.default.refreshToken(req.body);
            login_model_1.default.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                rfToken: rfToken
            });
            res.json({
                rfToken: rfToken
            });
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    check_login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    Logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new NewController;
