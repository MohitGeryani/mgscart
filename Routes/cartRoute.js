import express from 'express';

import {  requireSignIn } from '../middlewares/authMiddleware.js';

import { AddtocartController } from "../Controller/cartController.js";


const router= express.Router();





router.post('/add-to-cart', AddtocartController); 


export default router;