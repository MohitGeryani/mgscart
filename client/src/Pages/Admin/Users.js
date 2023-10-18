import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'

const Users = () => {
  return (
    <Layout title={'All Users'}>
    <div className='container-fluid  p-3'>
    <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
       <h3>All Users</h3>
        </div>
    </div>
    </div>
  
    </Layout>
  )
}

export default Users