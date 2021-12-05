import userService from '../service/user.service'
import mailService from '../service/mail.service'
import User from '../model/user.model';
import mail from "../mailer/mailer";
import template from "../email_template/template"
import { hash } from 'bcrypt';
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

class NewController
{
   
    async forgot_pwd(req: any, res: any)
    {
        const email = req.body.email
        try {
            const user = <any> await User.findOne({ email: email });
            if (user) 
            {
                const regCode = userService.generateRegCode();
                const hash_reqCode = await userService.hashpass(regCode);
                //store hash_code in database
                await User.findOneAndUpdate({ email: email}, {reset_digest: hash_reqCode})
                const link = `${process.env.Domain_Fe}/forgot-pwd/${regCode}?email=${email}`;
                const form = {
                    name: user.name,
                    link: link
                }
                //create a template
                const forgot_pwd_template = template.forgot_pwd(form)
                //create option (sent to who ??)
                const mail_options = mailService.mail_options(email, forgot_pwd_template, "Forgot password");
                //conect mail server
                const transporter = mail.connect()
                //send mail
                mailService.send_mail(transporter, mail_options)
                res.sendStatus(200)
            }
            else
            {
                res.sendStatus(400)
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    }
    
    async changePwd(req: any, res: any)
    {
        const {email, password, new_password, new_password_confirmation} = req.body;
        if(new_password_confirmation == new_password)
        {
            const user = <any> await User.findOne({ email: email});
            {
                if(await userService.comparepass(password, user.password))
                {
                    const hash_newpassword = await userService.hashpass(new_password);
                    await User.findOneAndUpdate({email: email}, {password: hash_newpassword});
                    res.sendStatus(200)
                }
                else
                {
                    res.json({status: 400, error: "Password dont match"})        
                }
            }
        }
        else
        {
            res.json({status: 400, error: "New Password confirm dont match"})
        }
    }
}

export default new NewController;