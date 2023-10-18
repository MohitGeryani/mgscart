import express from 'express';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { categoryController, createcategoryController, deleteCategoryController, singlecategoryController, updateCategoryController } from '../Controller/categoryController.js';

const router = express.Router();


// Category Routes 

router.post('/create-category', requireSignIn, isAdmin, createcategoryController)


// Update Category 


router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)


// getall Categories

router.get('/category' , categoryController);


// single Category

router.get('/single-category/:slug' , singlecategoryController);

// Delete Category 

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)



export default router;
