import userService from '../service/user.service';
import User from '../model/user.model';
import Login from '../model/login.model';
import validate from '../service/Validation.service';
const jwt = require('jsonwebtoken');



class NewController{
    async Register(req: any, res: any)
    {
        try{
            const { error } = validate.regisValidate(req.body);
            if (error)  return res.status(400).send(error.details[0].message);
            const hashed = await userService.hashpass(req.body.password);
            User.create({
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                email: req.body.email,
                password: hashed
            })
        }catch(err){
            console.log(err);
        }    
    }

    async Login (req: any, res: any)
    {
        const { error } = validate.loginValidate(req.body);
        if (error)  return res.status(400).send(error.details[0].message);
            //check email
            const user =<any> await User.findOne({email:req.body.email})
            if(user){
                if (!user) return res.status(400).send('Email is wrong');
                    //check password
                   
                    const validPass = userService.comparepass(req.body.password,user.password);
                    if(!validPass) return res.status(400).send('password is wrong');
                    //create token
                    const token = userService.JWT(user)
                    const hashedtoken = await userService.hashpass(token)
                    res.json({
                        token:hashedtoken,
                        role:"customer"
                    });
                }
    }
    async refreshToken(req: any, res: any)
    {
        const rfToken = userService.refreshToken(req.body);
        Login.create({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            rfToken:rfToken
        })
        res.json({
            rfToken:rfToken
        })

    }

    async createUser(req: any, res: any)
    {

    }

    async check_login(req : any, res: any)
    {

    }

    async Logout(req: any, res: any)
    {

    }
 
    

}

export default new NewController;