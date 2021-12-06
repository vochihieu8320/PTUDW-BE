
import mongoose from 'mongoose';

const Login = new mongoose.Schema(
    {
        name: 
        {
            type: String,
            required: true,
            minlength:3,
            maxlength:50,
        },
        password:
        {
            type: String,
            minlength: 8,
        },
        email:
        {
            type: String,
            require: true,
            unique: true,
            required: true,
            minlength: 0
        },
        rftoken:
        {
            type: String,
            require: true,
            unique: true,
            required: true,
            minlength: 0
        },
        isOnline:
        {
            //1 for online 2 for ofline
            type: Boolean
        },
    },
    { timestamps: true}
)

const model = mongoose.model('Login', Login);
export default model;
