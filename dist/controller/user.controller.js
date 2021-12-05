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
const mail_service_1 = __importDefault(require("../service/mail.service"));
const user_model_1 = __importDefault(require("../model/user.model"));
const mailer_1 = __importDefault(require("../mailer/mailer"));
const template_1 = __importDefault(require("../email_template/template"));
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
class NewController {
    forgot_pwd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            try {
                const user = yield user_model_1.default.findOne({ email: email });
                if (user) {
                    const regCode = user_service_1.default.generateRegCode();
                    const hash_reqCode = yield user_service_1.default.hashpass(regCode);
                    //store hash_code in database
                    yield user_model_1.default.findOneAndUpdate({ email: email }, { reset_digest: hash_reqCode });
                    const link = `${process.env.Domain_Fe}/forgot-pwd/${regCode}?email=${email}`;
                    const form = {
                        name: user.name,
                        link: link
                    };
                    //create a template
                    const forgot_pwd_template = template_1.default.forgot_pwd(form);
                    //create option (sent to who ??)
                    const mail_options = mail_service_1.default.mail_options(email, forgot_pwd_template, "Forgot password");
                    //conect mail server
                    const transporter = mailer_1.default.connect();
                    //send mail
                    mail_service_1.default.send_mail(transporter, mail_options);
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(400);
                }
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        });
    }
    changePwd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, new_password, new_password_confirmation } = req.body;
            if (new_password_confirmation == new_password) {
                const user = yield user_model_1.default.findOne({ email: email });
                {
                    if (yield user_service_1.default.comparepass(password, user.password)) {
                        const hash_newpassword = yield user_service_1.default.hashpass(new_password);
                        yield user_model_1.default.findOneAndUpdate({ email: email }, { password: hash_newpassword });
                        res.sendStatus(200);
                    }
                    else {
                        res.json({ status: 400, error: "Password dont match" });
                    }
                }
            }
            else {
                res.json({ status: 400, error: "New Password confirm dont match" });
            }
        });
    }
}
exports.default = new NewController;
