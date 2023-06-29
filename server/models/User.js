import {Schema, model } from 'mongoose';


const userSchema = new Schema(
    {
        fullName: {
            type: String,
            require: [true, 'fullname is required']
        },

        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
        },
        mobile: {
            type: Number,
            require: [true, 'mobile is required']
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            minlength: [6, 'password length must be at least 6 characters'],
        },
    },
    { timestamps: true }
);
    
const User = model('User', userSchema);

export default User;