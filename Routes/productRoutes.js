import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { braintreePaymentsController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../Controller/productController.js';
import formidable from 'express-formidable';
const router = express.Router();


// routes 

// Create Product

router.post('/create-product', requireSignIn, isAdmin,formidable() ,createProductController)




// Update Product

router.put('/update-product/:pid', requireSignIn, isAdmin,formidable() ,updateProductController)


// Get Products 

router.get('/get-product', getProductController)



// Single / Particular Product

router.get('/get-product/:slug', getSingleProductController) // we gave same route to single product just as get product "/get-product" but difference is we're getting slug in single product



// Get Photo 

router.get('/product-photo/:pid', productPhotoController)  // pid is basically product id , we'll get photo of product on the basis of id of product 


// Delete Product 

router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController)


// Filter Product 

router.post('/products-filters', productFilterController)




// Product Count  

router.get('/product-count' ,productCountController);



// Products Per Page to limit products (FOR Load More Pagination)

router.get('/fetch-products/:page', productListController)


// Search Product 

router.get('/search/:query', searchProductController)


// Similar Products 

router.get('/related-products/:pid/:cid', relatedProductController)



// Category wise Product  (When user Click on specific category , it shows data related to that category)

router.get('/product-category/:slug', productCategoryController);


// Payments Routes 

// token (we will get token from braintree)

router.get('/braintree/token', braintreeTokenController);

// Payments 

router.post('/braintree/payment', requireSignIn, braintreePaymentsController)



export default router;
