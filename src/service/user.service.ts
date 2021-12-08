const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const token_secret = process.env.JWT_TOKEN_SECRET || ""
const characters = [
    'A', 'B', 'C', '0', 'D', '1', 'E', 'F', 'G',
    '2', 'H', 'I', '3', 'J', 'K', '4', 'l', 'M',
    'N', '5', 'O', 'P', '6', 'Q', 'R', 'S', '7',
    'T', 'U', 'V', '8', 'W', '9', 'X', 'Y', 'Z','A']



async function hashpass(password: string)
{
    const password_hash = await  bcrypt.hash(password, 10);
    return password_hash;
}

async function comparepass(password:string, hasspass: string):Promise<boolean>{
    if(await bcrypt.compare(password, hasspass))
    {
        return true;
    }
    return false;
}
 function JWT(user: any) {
  
    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token_secret,
        { expiresIn: '1h' }
    )
    return token
}

function refreshToken(user: any)
{
  
    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            refreshToken: 1
        },
        token_secret
    )
    return token
}

//auto generateCode
function generateRegCode(): string {
    let regCode = "";
    for (let i = 0; i < 10; i++) {
      const rand = Math.floor(Math.random() * characters.length); 
      regCode = regCode + characters[rand];
    };
    return regCode;
  };


// check token is valid or not
async function authentication(req: any, res: any, next: any)
{
  
    const autHeader = req.headers["authorization"];
    const token = autHeader && autHeader.split(' ')[1];
  
    if(!token)
    {
        res.sendStatus(401);
    }
    else
    {
        try 
        {
            const user =<any> await jwt.verify(token, process.env.JWT_TOKEN_SECRET || "");
            if(user.refreshToken)
            {
                res.json({staus: 400, error: "please enter token !!"})
            }
            else
            {
                next();     
            }
           
        } catch (error) 
        {
            res.json({status: 400, error: "token is expired"})  
        }
     
    }
}




export default {hashpass, comparepass, JWT, authentication, refreshToken, generateRegCode}