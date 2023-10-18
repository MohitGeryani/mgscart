import categoryModel from "../models/categoryModel.js";
import slugify  from 'slugify';
import userModel from "../models/userModel.js";


// Create Category

export const createcategoryController = async(req,res) => {
        try {

            const {name} = req.body;
            if(!name) {
                return res.send({message: 'Name is Required'}).status(500);
            }

            // checking if there's any existing category present
            const existingCategory = await categoryModel.findOne({name: name});
            if(existingCategory) {
                return res.status(200).send({
                    success: false,
                    message: 'Category Already Exists'
                });
            }
            // saving category if there's no existing category found 
            const category = await new categoryModel({name, slug: slugify(name) }).save();
            res.status(201).send({
                success: true,
                message: 'New Category Created',
                category
            });

        }catch(error) {
            res.send({
                success: false,
                error,
                message: 'Error in Category'
            }).status(500);
        }
};


// Update Category

export const updateCategoryController = async(req,res) => {

    try {

        const {name} = req.body;
        const {id} = req.params;     // id will be obtained from url

        const category = await categoryModel.findByIdAndUpdate(id,{name: name, slug: slugify(name)}, {new: true}); // we are updating data thus in 3rd parameter we gave new: true  if  we dont give then it won't update
        res.send({
            success: true,
            message: 'Category Updated Successfully',
            category
        }).status(200);
    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: 'Error While Updating Category'
        }).status(500);
    }

}


// GetAll Categories 

export const categoryController = async (req,res) => {

    try{

        const category = await categoryModel.find({});  // we're giving empty object to get all categories 
        res.status(200).send({
            success: true,
            message: 'All Categories List',
            category
        });


    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: 'Error While Getting Categories'
        }).status(500);
    }

}






// Single or Particular Category 

export const singlecategoryController = async(req,res) => {

        try{


            const singleCategory = await categoryModel.findOne({slug:req.params.slug});

            res.status(200).send({
                success: true,
                message: "Single Category",
                singleCategory
            })






        }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: 'Error While Getting Single Categories'
        }).status(500);
    }

}



/// Delete Category 

export const deleteCategoryController = async(req,res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.send({
            success: true,
            message: 'Category Deleted Successfully',
            
        }).status(200);

    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: 'Error While Deleting Category', 
            error
        }).status(500);
    }
}