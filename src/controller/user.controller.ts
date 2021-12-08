import userService from '../service/user.service';
import User from '../model/user.model';
import validate from '../service/Validation.service';
const jwt = require('jsonwebtoken');



class NewController{
    async Register(req: any, res: any)
    {
        try{
            // const { error } = validate.regisValidate(req.body);
            // if (error)  return res.status(400).send(error.details[0].message);
            const hashed = await userService.hashpass(req.body.password);
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashed,
                user_type: req.body.user_type
            })
            
            res.sendStatus(200)
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
                    const refreshToken = userService.refreshToken(user)
                    //update fresh token
                    await User.updateOne({email: user.email, refreshToken: refreshToken})
                    res.json({
                        token: token,
                        refreshToken: refreshToken
                    });
                }
    }
    async refreshToken(req: any, res: any)
    {
        const {email, refreshToken} = req.body;
        //check refreshToken is valid or not
        try {
            const user =<any>User.findOne({email: email});
            if(user.refreshToken === refreshToken)
            {
                const new_refresh_token = userService.refreshToken(user);
                const new_token = userService.JWT(user);
                //update new refreshtoken
                await User.updateOne({email: email}, {refreshToken: new_refresh_token})
                res.json({
                    token: new_token,
                    refreshToken: new_refresh_token
                })
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        }
        

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