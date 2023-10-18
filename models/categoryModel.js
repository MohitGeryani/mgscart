import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    // whenever we want to use white space we can use _ with the help of slug and for that we need a package called slugify and now we create a slug its good for seo 

    slug: {
        type: String,
        lowercase: true
    }


});

export default mongoose.model('Category', categorySchema);