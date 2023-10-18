import express from 'express';
import {registerController, loginController, testcontroller, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../Controller/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// routes object 


const router = express.Router();



// Routing

// Register User

// REGISTER || METHOD POST
router.post('/register', registerController);



/// Login || METHOD POST

router.post('/login', loginController);



// Forgot Password 

router.post('/forgot-password', forgotPasswordController)

// test route 

router.get('/test',requireSignIn, isAdmin, testcontroller)




// protected route auth (DASHBOARD) //FOR USER's DASHBOARD

router.get('/user-auth', requireSignIn, (req,res) => {
        res.status(200).send({ok:true});
});



// protected route auth (DASHBOARD) //FOR ADMIN's DASHBOARD

router.get('/admin-auth', requireSignIn, isAdmin, (req,res) => {
        res.status(200).send({ok:true});
});



// Update Profile 

router.put('/profile',requireSignIn, updateProfileController )



// Orders  

router.get('/orders', requireSignIn, getOrdersController);


// All Orders (Admin)

router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);


/// Order Update (Status Update)

router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController)



export default router;