const Joi = require('@hapi/joi');

//regis
const regisValidate = (data: any) => {
    const schema =Joi.object({
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required().email(),
        password: Joi.string()
        .min(6)
        .required()
    })
    return schema.validate(data)
};

const loginValidate = (data: any) => {
    const schema =Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data)
};

export default {regisValidate,loginValidate}