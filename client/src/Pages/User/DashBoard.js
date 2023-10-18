import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Context/auth'
const DashBoard = () => {

  const[auth] = useAuth();
  return (
   <Layout title={"DashBoard: MG's CART"}>
      

<div className="container-fluid   p-3"> 
    <div className="row">
        <div className="col-md-3"><UserMenu /></div>
        <div className="col-md-9">
         <div className='card w-75 p-3' >
          <h3>Name: {auth?.user?.name}</h3>
          <h3>Email: {auth?.user?.email}</h3>
          <h3>Address: {auth?.user?.address}</h3>
         </div>
        </div>
    </div>
</div>



   </Layout>
  )
}

export default DashBoard