import mongoose from "mongoose";
import colors from 'colors';
import dotenv from 'dotenv'

const connectDB = async() => {
    try {   
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database Connnected To MongoDB ${connect.connection.host}`.bgMagenta.white);

    }   
    catch(error) {
        console.log(`Error in DataBase : ${error}`.bgRed.white);
    }
}


export default connectDB;