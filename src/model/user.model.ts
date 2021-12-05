
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
            required: true,
            minlength: 0
        },
        reset_digest:
        {
            type: String
        }

    },
    { timestamps: true }
)

const model = mongoose.model('User', User);
export default model;
