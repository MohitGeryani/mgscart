import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;




const CreateProduct = () => {

  const navigate = useNavigate();
  
  
  
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  //// Geting ALL Categories

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/category`);

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Getting Categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);




  const createProduct = async (e) => {
    e.preventDefault();
    try { 
      const productData = new FormData();
      productData.append("name" , name)
      productData.append("description" , description)
      productData.append("price" , price)
      productData.append("quantity" , quantity)
      productData.append("photo" , photo)
      productData.append("category" , category)
      

      const {data} = axios.post(`${process.env.REACT_APP_API}/create-product`, productData)
    if(data?.success) {
      toast.error(data?.message);
    } 
    else {
      navigate('/dashboard/admin/products')
      toast.success("Product Created Successfully");
    }

    }catch(error) {
      console.log(error)
    toast.error("Error In Creating Product")
    } 
  }



  return (
    <Layout title={"Create Products"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Create Product</h2>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select A Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
  <label  className="btn btn-secondary col-md-12">
  {photo? photo.name : 'Upload Photo'}
  <input
    
    type="file"
    name="photo"
    accept="image/*"
    onChange={(e) => setPhoto(e.target.files[0])}
    style={{display: 'none'}}
  />
    </label>
</div>

{/* Showing image Slected By User */}

<div className="mb-3">
  {photo && (
    <div className="text-center"><img src={URL.createObjectURL(photo)} alt="product-photo" height={'200px'} className="img img-responsive"  /></div>
  )}
</div>


<div className="mb-3"> 

    <input type="text" value={name} placeholder="Product Name" className="form-control" onChange={(e) => setName(e.target.value)}/>

</div>
<div className="mb-3"> 

    <textarea type="text" value={description} placeholder="Product Description" className="form-control" onChange={(e) => setDescription(e.target.value)}/>

</div>
<div className="mb-3"> 

    <input type="text" value={price} placeholder="Product Price" className="form-control" onChange={(e) => setPrice(e.target.value)}/>

</div>
<div className="mb-3"> 

    <input type="number" value={quantity} placeholder="Product Quantity" className="form-control" onChange={(e) => setQuantity(e.target.value)}/>

</div>
<div className="mb-3"> 
<Select
                bordered={false}
                placeholder="Shipping"
                size="medium"
               
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
              
                  <Option value="1"> Yes </Option>
                  <Option value="0"> No </Option>
              
              </Select>
</div>



{/* Create Product */}

                <div className="mb-3">
                  <button className="btn btn-primary" onClick={createProduct} >Create Product</button>
                </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
