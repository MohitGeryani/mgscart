import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: {},
        required: true
    },
    answer: {    // answer of question to forgot password
        type: String,
        require: true
    },

    role: {
        type: Number,
        default: 0
    
    }


}, {timestamps: true}); // Timestamp will create a timestamp of user when it is created in database 



export default mongoose.model('users', UserSchema);