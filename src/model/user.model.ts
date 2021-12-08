
import mongoose from 'mongoose';

const User = new mongoose.Schema(
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
        phone: 
        {
            type: String,
            required: false,
            length: 11
        },
        address:
        {
            type: String,
            required: false,
            minlength: 5,
            maxlength : 50
        },
        avatar:
        {
            type: String,
            required: false,
            minlength: 0
        },
        email:
        {
            type: String,
            require: true,
            unique: true,
            match: /.+\@.+\..+/,
            minlength: 9,
            maxlength: 50
        },
        reset_digest:
        {
            type: String
        },
        user_type:
        {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        }
    },
    { timestamps: true}
)
User.index({email: 1})
const model = mongoose.model('User', User);
export default model;
