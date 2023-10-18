import Layout from '../Components/Layout/Layout'
import React from 'react'
import useCategory from '../Hooks/useCategory'
import { Link, useNavigate } from 'react-router-dom';

const Categories = () => {

    const categories = useCategory();
    const navigate = useNavigate();

    return (
   <Layout>
   <div className="container">

   <div className="row">
    {categories.map((c) => (

   
    <div className="col-md-6 mt-4">
    <div className="category_card" key={c._id}>
     <div className='card' onClick={()=> navigate(`/category/${c.slug}`) }>

         <div id='category_title'>{c.name}</div>
       
        

     </div>
     </div>
    </div>
    ))}
   </div>

   </div>
   </Layout>
  )
}

export default Categories