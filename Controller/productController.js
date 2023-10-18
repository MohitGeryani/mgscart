import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";


import braintree from "braintree";
import OrderModel from "../models/OrderModel.js";

import dotenv from 'dotenv';

dotenv.config();



//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});











export const createProductController = async (req, res) => {
  ///we installed express-formidables package coz we needed photos to be sent as string in database

  try {
    // req.fields is used bcs we installed a package callled express-formidable which allows us To upload files to a server. in our case we need photo so we used req.fields for form data amd req.files for file
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res
          .send({
            success: false,
            message: "Name is Required",
          })
          .status(500);
      case !description:
        return res
          .send({
            success: false,
            message: "Description is Required",
          })
          .status(500);
      case !price:
        return res
          .send({
            success: false,
            message: "Price is Required",
          })
          .status(500);
      case !category:
        return res
          .send({
            success: false,
            message: "Category is Required",
          })
          .status(500);
      case !quantity:
        return res
          .send({
            success: false,
            message: "Quantity is Required",
          })
          .status(500);
      case photo && photo.size > 1000000:
        return res
          .send({
            success: false,
            message: "Photo is Required and Should Be Less Than 1MB",
          })
          .status(500);
    }

    // Saving the product  in db

    const product = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path); //
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Creating Product",
      error,
    });
  }
};

// Get All Products

export const getProductController = async (req, res) => {
  try {
    /// here we are excluding photos to be loaded at initial time coz it can increase size of response and app can get slow thus we'll create another api for photos to load and then merge it with this api
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      totalCount: products.length,
      success: true,
      message: "Products Obtained Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Getting Product",
      error: error.message,
    });
  }
};

// Get a Particular / Single Product

export const getSingleProductController = async (req, res) => {
  try {
    // populate category means we are adding category in product
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Getting Single Product",
      error: error.message,
    });
  }
};

// Get Photo  of Product

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo"); // we selected photo coz we only need photo in this api
    // Validation
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data); // we are passing photo data directly in response
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Getting Product Photo",
      error: error.message,
    });
  }
};

// Delete Product

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Deleting Product",
      error: error.message,
    });
  }
};

// Update Product Controllers

export const updateProductController = async (req, res) => {
  try {
    // req.fields is used bcs we installed a package callled express-formidable which allows us To upload files to a server. in our case we need photo so we used req.fields for form data amd req.files for file
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res
          .send({
            success: false,
            message: "Name is Required",
          })
          .status(500);
      case !description:
        return res
          .send({
            success: false,
            message: "Description is Required",
          })
          .status(500);
      case !price:
        return res
          .send({
            success: false,
            message: "Price is Required",
          })
          .status(500);
      case !category:
        return res
          .send({
            success: false,
            message: "Category is Required",
          })
          .status(500);
      case !quantity:
        return res
          .send({
            success: false,
            message: "Quantity is Required",
          })
          .status(500);
      case photo && photo.size > 1000000:
        return res
          .send({
            success: false,
            message: "Photo is Required and Should Be Less Than 1MB",
          })
          .status(500);
    }

    // Saving the product  in db

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path); //
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Updating Product",
      error: error.message,
    });
  }
};

/// Product filter controller

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);

    if (products.length === 0) {
      res.status(200).send({
        success: false,
        message: "No Items Found , Try Something Else",
      });
    } else {
      res.status(200).send({
        success: true,
        products,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// Product Count

export const productCountController = async (req, res) => {
  try {
    const totalProducts = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: "true",
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: "false",
      error,
      message: "Error in Product Count",
    });
  }
};

// Product List Based on Page

export const productListController = async (req, res) => {
  try {
    const perPage = 10;
    const page = req.params.page ? req.params.page : 1;
    const skip = (page - 1) * perPage; // if page is 1 then we are skipping 0 products and initially it shows 10 products , if page is 2 , then we are skippping 10 products and showing next 10 products  if page is 3 , we skipped 20 products and show next 10 products we will manage page state in client(front End)
    const products = await productModel
      .find({})
      .select("-photo")
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });                         //The .sort({ createdAt: -1 }) code is used to sort the results of your database query based on the createdAt field in descending order (-1), which means the most recently created items will appear first in the result set.
    res.status(200).send({
    totalCount: products.length,
      success: true,
      products,
    });
  } catch(error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in Per Page Controller",
    });
  }
};



// Search Products Controller 

export const searchProductController  = async(req,res) => {
    try{

        const {query} = req.params;
        const results = await productModel.find({
            $or: [
                {name: {$regex : query, $options: "i"}}, // options i is to make it case insensitive
                {description: {$regex : query, $options: "i"}} 
            ]
        }).select("-photo")
        
        res.json(results);
        

    }catch(error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in Search Product API',
            error
        });
    }
}



// Similar Product Controller  

export const relatedProductController = async(req, res) => {
      try {

        const {pid, cid} = req.params;  // we'll fetch similar products on the basis of product's category
        const products = await productModel.find({
          category: cid,
          _id: {$ne: pid } // here ne is not included , means we do not include the same product in similar product section
        }).select("-photo").limit(4).populate("category");

        res.status(200).send({
          success: true,
          products
        })

      }catch(error) {
        res.send(400).send({
          success: false,
          message: 'Error While Getting Similar Products',
          error
        })
      }
}




/// Get Product By Category 

export const productCategoryController = async(req,res) => {

  try {

    const category = await categoryModel.findOne({slug: req.params.slug});

    const products = await productModel.find({category}).populate("category");

    res.status(200).send({
      success: true,
      category,
      products,
      message: 'Successfully Fetched'
    })


  }catch(error) {

    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error while Getting product' ,
      error
    })

  }

}



// Payment Gateway API 

// for token

export const braintreeTokenController = async (req, res) => {

  try {

    gateway.clientToken.generate({}, function(err, response) {
      if(err) {
        res.status(500).send(err);
        
      } else {
        res.send(response);
      }
    })

  } catch(error) {
    console.log(error)
  }

}




// for payments 

export const braintreePaymentsController = async (req,res) => {
  try  {

    const {cart, nonce} = req.body;

    let total = 0;
    cart.map( (item) => {total += item.price});
     
    let newTransaction = gateway.transaction.sale({
      amount: total,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    },
    

    function (error, result) {
      if(result) {
        const order = new OrderModel({
          products: cart,
          payment: result, 
          buyer: req.user._id 
        }).save()
        res.json({ok: true});
      } else {
        res.status(500).send(error);
      }
    }

   
    );

  } catch(error) {
    console.log(error);
  }

}