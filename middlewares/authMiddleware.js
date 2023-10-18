import JWT from 'jsonwebtoken';
import dotenv from 'dotenv'
import userModel from '../models/userModel.js';
import e from 'express';



// Protected Route (token base)

export const requireSignIn = async(req,res,next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET); // actually token is present in header so we use header
        req.user = decode;
        next();
    } catch(error) {
    
        console.log(error);
    }
} 



// Admin Access

export const isAdmin  = async (req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1) {
            return res.send({
                success: false,
                message: 'Unauthorized Access'
            }).status(401);
        } else {
            next();
        }
    }   catch(error) {
        console.log(error)
        res.send({
           success: false, 
            message: 'Error in Admin Middleware',
            error
        }).status(401);
    }
}