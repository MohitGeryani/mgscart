import Layout from '../../Components/Layout/Layout';
import React, { useState, useEffect } from 'react'
import AdminMenu from './../../Components/Layout/AdminMenu';
import { useAuth } from '../../Context/auth';
import { useNavigate } from 'react-router-dom';
import DummyImage from '../../Components/DummyImage';
import moment from 'moment';
import axios from 'axios';

import { Select } from 'antd';

const {Option} = Select;


const AdminOrders = () => {

    const [status, setStatus ] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]) 
       
    const [changeStatus, setChangeStatus] = useState("");
   
    
    const [orders, setOrders]  = useState([]);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [loadedImages, setLoadedImages] = useState([]);

    const getOrders = async() => {
      try {

        const {data} = await axios.get(`${process.env.REACT_APP_API}/all-orders`);
        setOrders(data);

      } catch(error) {
        console.log(error);
      }

      }

      useEffect(() => {
        if(auth?.token) 
        getOrders();

      }, [auth?.token]);



      const handleImageLoad = (productId) => {
    
        console.log(`${productId}`)
        // Add the productId to the loadedImages array
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, productId]);
      };
    


       const handleChange = async (orderId , value) => {
        try {

            const {data} = await axios.put(`${process.env.REACT_APP_API}/order-status/${orderId}` ,  {status: value})
            getOrders();
        } catch(error) {
            console.log(error);
        }
       }


  return (

    <Layout title={'ALL Orders'}>

<div className='container-fluid  p-3'>
    <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
       <h3>All Orders</h3>
       




       {orders.map((order, index) => {
            return (
              <div className='border shadow'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Buyer</th>
                      <th scope='col'>Date</th>
                      <th scope='col'>Payment</th>
                      <th scope='col'>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index+1}</td>
                      <td>
                        <Select bordered={false} onChange={(value) => handleChange(order._id, value) } defaultValue={order?.status}  >
                            {status.map((status,index) => (
                                <Option key={index} value= {status}>{status}</Option>
            ))}
            </Select>
                      </td>
                      <td>{order? order?.buyer?.name : ''}</td>
                      <td>{moment(order.createdAt).fromNow()}</td>
                      <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{order? order?.products?.length : ''}</td>

                    </tr>
                  </tbody>
                </table>

                <div className='container'> 
                  
                  {order?.products?.map((p,i) => (
                    <div className="row m-2  flex-row" key={p._id}   >
                        
                        <div className='cart_items_card' >
                        <img
              src={`${process.env.REACT_APP_API}/product-photo/${p._id}`}
              className= {`product-photo ${loadedImages.includes(p._id) ? 'loaded' : ''}`}
              alt={p.name}
                  onLoad={() => handleImageLoad(p._id)}
            />
              {!loadedImages.includes(p._id) && <DummyImage  />}

                            <div className="cart_item_details" >
                                <h6 style={{cursor: 'pointer'}}  onClick={()=> navigate(`/product/${p.slug}`)}>{p.name.substring(0,50)}...</h6>
                                <p style={{fontSize: '13px'}}>{p.description.substring(0, 42)}...</p>
                                
                            <div className="item_price">

                                <h6 style={{fontSize: '14px'}}>Price : {p.price}$</h6>
                                     </div>
                            </div>
                            

                        
                        
                            
                        
                        </div>
                    </div>

                  ))}

                
                </div>





                </div> 
              
            )
        })}


          


       
        </div>
    </div>
    </div>


    </Layout>

  )
}

export default AdminOrders