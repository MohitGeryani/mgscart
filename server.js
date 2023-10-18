import  express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from './Routes/authRoute.js'
import categoryRoutes from './Routes/categoryRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import cartRoute from './Routes/cartRoute.js'
import cors from 'cors';

// Configure env 
dotenv.config(); /// our env file is in root folder so we dont need to give path else we have to give path as dotenv.config({path: 'path of env file'});


// database config

connectDB();






// rest object  

const app = express();

// middleware 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))



// Routes 

app.use(authRoutes)
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoute)

/// Rest APIS

app.get("/",  (req,res) => {
    res.send('<h1>This is MGS Cart Server</h1>')
});



// PORT 
const PORT = process.env.PORT || 8080;



app.listen(PORT,() => {
    console.log(`Server Running On Port: ${PORT}`.bgCyan.white);
})