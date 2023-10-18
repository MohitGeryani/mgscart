import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../Components/Form/CategoryForm';
import {Modal} from 'antd'

const CreateCategory = () => {

  const [categories, setCategories] = useState([]); /// categories hold multiple values thus we used array

  const [name, setName] = useState("");

  const [visible, setVisible] = useState(false);

  const [selected , setSelected] = useState(null);

  const [updatedName, setUpdatedName] = useState("");
  
  const [loading , setLoading] = useState(true)
  


    //// Geting ALL Categories 

    const getAllCategories = async() => {
      try {

        const {data} = await axios.get(`${process.env.REACT_APP_API}/category`);
        
        if(data?.success) {

          setCategories(data.category);
        
        }

      }catch(error) {
        console.log(error);
        toast.error("Error in Getting Categories");
      }
    }


    useEffect(() => {
      
    

      
      getAllCategories()
      .then(() => {
        console.log("Data fetched successfully.");
      
        
         setLoading(false)
     
      
        
        })
        .catch(() => {
          console.log("Error fetching data.");
          setLoading(false);
        });
    }, []);
    








  // handle Submit OR Create Category 

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {

      const {data} = await axios.post(`${process.env.REACT_APP_API}/create-category`, {name});
      if(data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
      }
      else {
        toast.error(data.message);
      }
        

    }catch(error) {
      console.log(error);
      toast.error("Something Went Wrong While Submitting")
    }

  }






  // Handle update OR UPdate Category

  const  handleUpdate = async(e) => {
    e.preventDefault();
    
    try {
        const {data} = await axios.put(`${process.env.REACT_APP_API}/update-category/${selected._id}`, {name: updatedName})
        if(data?.success) {
          toast.success(`${name} is updated`);
          setSelected(null);
          setUpdatedName("");
          setVisible(false);
          getAllCategories();
        } else {
          toast.error(data.message);
        }


          }
    
    catch(error){
      console.log(error);
      toast.error("Something went wrong!")
    }
  }



// Delete Category 


const handleDelete = async(pid) => {


  try {

    const {data} = await axios.delete(`${process.env.REACT_APP_API}/delete-category/${pid}`, {name})
    if(data?.success) {
      toast.success(`${name} Deleted Successfully`)
      setSelected(null);
          setVisible(false);
          getAllCategories();

    }

  } catch(error) {
    console.log(error);
    toast.error("Error In Deleting Item");
  }


}





  return (
    <Layout title={'Create Category'}>
    <div className='container-fluid p-3'>
    <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
        <h2>Manage Category</h2>
        <div className="p-3 w-50">
          <CategoryForm 
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <div className='w-75'>
          <table className="table" >
    <thead >
      <tr>
       
        <th scope="col">Name</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
                   
    {
    loading ? ( 
    <>
      {[...Array(4)].map((index) => (
        <tr key={index}>
        <td > <div className='skeleton skeleton-text'></div></td>
        <td> 
     <div style={{display: 'flex'}}>   <div className='skeleton skeleton-btn'></div>
        <div className='skeleton skeleton-btn'></div></div>
        </td>
    
      </tr>

      )) }
        </>
     
    ) : 

                       
    categories?.map((category) => (
                    
                    
                      <tr key={category._id}>
                        <td><font style ={{fontWeight: '600'}}>{category.name}</font></td>
                          
            <td ><button style={{color: 'white', background: 'black', width: '65px', height: '26px', border: "none", borderRadius: '4px', margin: '4px' }} onClick={()=>{ setVisible(true); setUpdatedName(category?.name); setSelected(category)  }}>Edit</button>
            <button style={{color: 'white', background: 'red', width: '65px', height: '26px', border: "none", borderRadius: '4px',margin: '4px'}} onClick={()=>{ handleDelete(category._id);   }}>Delete</button>
            </td>
          </tr>
      
      ))} 
      
    </tbody>
  </table>



        </div>

      <Modal onCancel= {()=> setVisible(false) } footer={null} open={visible} >
        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
      </Modal>

        </div>
    </div>
    </div>
  
    </Layout>
  )
}

export default CreateCategory