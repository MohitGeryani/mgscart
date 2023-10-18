import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        
    },

    // whenever we want to use white space we can use _ with the help of slug and for that we need a package called slugify and now we create a slug its good for seo 

    slug: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {

        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
    },

    



}, {timestamps: true});

export default mongoose.model('Products', productSchema);