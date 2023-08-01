import mongoose from 'mongoose'
// import { number } from 'zod';

const Schema = mongoose.Schema;

const userSchema =  new Schema({


    name: {
        type: String,
        required: true 
    },
    
    email: {
        type: String,
        required: true 
    },

    roles: {
        user: {
            type: Number,
            default: 1000
        },
        Editor: Number,
        Admin: Number
    },

    password: {
        type: String,
        required: true
    },

    refreshToken: String
})

export default mongoose.model('User', userSchema); 