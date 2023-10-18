import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../Context/auth'

const AdminDashboard = () => {

  const [auth] = useAuth();

  return (
    <Layout title={'Admin Dashboard'}>

    <div className='container-fluid  p-3'>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
          <div className="col-md-9">
           <div className="card">
           
           <h3>Admin Name: {auth?.user?.name}</h3>
           <h3>Admin Email: {auth?.user?.email}</h3>
           <h3>Admin Contact: {auth?.user?.phone}</h3>
           
           </div>
          </div>
        
      </div>
    
    
    </div>
    </Layout>
  )
}

export default AdminDashboard