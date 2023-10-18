import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../Context/auth';

import DummyImage from '../../Components/DummyImage';

import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';


const Orders = () => {

    const [orders, setOrders]  = useState([]);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [loadedImages, setLoadedImages] = useState([]);

    const getOrders = async() => {
      try {

        const {data} = await axios.get(`${process.env.REACT_APP_API}/orders`);
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
    

  return (
    <Layout title={'Your Orders'}>

    <div className="container-fluid  p-3">
        <div className="row">
            <div className="col-md-3"><UserMenu /></div>
            <div className="col-md-9">
                <h2 className='text-center'>Your Orders</h2>
                {/* <p>{JSON.stringify(orders, null, 4)}</p> */}

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
                      <td>{order? order.status : ''}</td>
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

export default Orders