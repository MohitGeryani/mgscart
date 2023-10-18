import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import OrderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import JWT  from "jsonwebtoken";

export const registerController = async(req,res) => {
            try {
                 // getting data which we added back in the schema , we are getting data from user
                const {name, email, password, phone, address,answer } = req.body;

                // validation of data 
               if (!name) {
                return res.send({message: 'Name Is Required!'});
                }
               if (!email) {
                return res.send({message: 'Email Is Required!'});
                }
               if (!password) {
                return res.send({message: 'Password Is Required!'});
                }
               if (!phone) {
                return res.send({message: 'Phone Is Required!'});
                }
               if (!address) {
                return res.send({message: 'Address Is Required!'});
                }
               if (!answer) {
                return res.send({message: 'Answer Is Required!'});
                }

                // Checking If there's any existing user ...

                const Existinguser = await userModel.findOne({email: email});
                if(Existinguser) {
                    return res.status(200).send({
                        success: false,
                        message: "Already Registered, Please Login!"});
                }

                // registering User
                const hashedPassword = await hashPassword(password);
                // save
                const user = await new userModel({
                  name,
                  email,
                  phone,
                  address,
                  password: hashedPassword,
                  answer
                }).save();

                res.status(201).send({
                    success: true,
                    message: 'User REgistered Successfully ',
                    user // passing user as a response 
                })


            } catch(error) {
                console.log(error);
                res.status(500).send({
                    success: false,
                    message: 'Error in Registration',
                    error // passing error object to show error 
                });
            }
};






export const loginController = async(req,res) => {

    try {
        const {email , password} = req.body;
        // Validation 
        if(!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Invalid Username or Password!"
            })
        }

        
        // Checking if user exists in database ?
        const user = await userModel.findOne({email: email});
        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is Not Registered'
            });
        }
        // If we  get the email and password successfully then we will compare our hashed password by decrypting the user's password 

        const matchpassword  = await comparePassword(password, user.password);

        if(!matchpassword) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }

        // Now we will create a token  
        const token  = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d" });
            res.status(200).send({
                success: true,
                message: 'Login Successfully',
                user : {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    role: user.role,
                    _id: user._id 
                },
                 token,
            });

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Login'
        });
    }

}


// forgot password 

export const forgotPasswordController = async (req,res) => {
    try{
        const {email,answer, newPassword} = req.body;
        if(!email) {
            res.status(400).send({
                success: false,
                message: 'Email is Required'
            })
        }
        if(!answer) {
            res.status(400).send({
                success: false,
                message: 'Answer is Required'
            })
        }
        if(!newPassword) {
            res.status(400).send({
                success: false,
                message: 'New Password is Required'
            })
        }
        // checking email and answer 

        const user = await userModel.findOne({email: email, answer: answer});
        if(!user) {
            res.status(404).send({
                success: false,
                message: 'Wrong email or answer'
            })
        }

        const hashedPassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password: hashedPassword});
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully'
        });


    } catch(error) {
        console.log(error);
        res.send({
            success: false,
            message: 'Something went Wrong!',
            error
        }).status(500);
    }
}



// test controller 

export const testcontroller =  (req,res) => {
    try {
        res.send("protected route");
    } catch(error) {
        res.send(error);
    }
}




// Update Profile 


export const updateProfileController = async(req,res) => {
        try{

            const {name, email, password, address, phone} = req.body;
            const user = await userModel.findById(req.user._id);
            // password 
            if( password && password.length < 6 ) {
                return res.send({message: 'Password is Required & 6 characters long'});
            }

            const hashedPassword = password? await hashPassword(password) : undefined;

            const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address
            },{new: true})
            
            res.status(200).send({
                success: true,
                message: 'Profile Updated Successfully',
                updatedUser
            })
            

        }catch(error) {
            console.log(error)
            res.status(400).send({
                success: false,
                message: 'Error While Updating Profile',
                error

            })
        }
}









// Orders 


export const getOrdersController = async (req,res) => {
    try {

        const orders = await OrderModel.find({buyer: req.user._id}).populate('products', "-photo").populate("buyer" , "name")

        res.json(orders);

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting orders',
            error
        })
    }
}





// All Orders (admin)

export const getAllOrdersController = async(req,res) => {

        try {

    const Allorders = await OrderModel.find({}).populate('products', "-photo").populate("buyer" , "name").sort({createdAt: "-1"});

    res.json(Allorders);

    } catch(error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'Error while getting orders',
        error
    })
    }
    
}


// order status update 

export const orderStatusController = async(req,res) => {
    try {

        const {orderId} = req.params;
        const {status}  = req.body;
        const orders = await OrderModel.findByIdAndUpdate(orderId, {status}, {new: true});
        res.json(orders);

    }catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error While Changing Order Status',
            error
        })
    }
}