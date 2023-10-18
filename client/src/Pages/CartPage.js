import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useCart } from '../Context/cart';
import { useAuth } from '../Context/auth';
import { useNavigate } from 'react-router-dom';
import DummyImage from '../Components/DummyImage';
import { BiPencil } from 'react-icons/bi';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from 'react-hot-toast';
 




const CartPage = () => {

    const [cart, setCart] = useCart();

    
    const [auth] = useAuth();
    
    const userId = auth?.user?._id;

    
 
    const navigate = useNavigate();

    const [clientToken, setClientToken] = useState('');
    
    const [instance, setInstance] = useState("");
    
        const [loading, setLoading] = useState(false);

 const [loadedImages, setLoadedImages] = useState([]);



    const handleImageLoad = (productId) => {
    
    console.log(`${productId}`)
    // Add the productId to the loadedImages array
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, productId]);
  };


  

 
// Total Price 

const totalPrice  = () => {
    try{
        let total = 0;
        cart?.map(item => total+= item.price); // total = total + item.price i.e all items price
        return total.toLocaleString("en", {
            style: 'currency',
            currency: 'USD'
        });

    }catch(error) {
        console.log(error);
    }
}


  // Remove Cart Item

  const removeCartItem = (pid) => {
  try {
    const userId = auth?.user?._id;
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === pid && item.userId === userId);
    if (index !== -1) {
      myCart.splice(index, 1);
      setCart(myCart); // Update the cart state
      localStorage.setItem(`cart_${userId}`, JSON.stringify(myCart)); // Update local storage
    }
  } catch (error) {
    console.log(error);
  }
};




//   const userCartItems = cart.filter((item) => item.userId === auth?.user?._id);


useEffect(()=> {
 console.log("cartdata in cartpage: ", cart);
}, [])



/// Get Payment Gateway Token 

    const getToken  = async () => {
        try {

           const {data} = await axios.get(`${process.env.REACT_APP_API}/braintree/token`);
           setClientToken(data?.clientToken);

        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken();
    },[auth?.token])




    // handle payments 

    const handlePayment = async () => {

        try {
            setLoading(true)
            const {nonce} = await instance.requestPaymentMethod();
            
            const {data}  = await axios.post(`${process.env.REACT_APP_API}/braintree/payment`, {
                nonce, cart
            });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success("Ordered Sucessfully");

        }catch(error) {
            console.log(error);
            setLoading(false);

        }

    }


    return (
   <Layout>
    <div className="container">
        <div className="row">

        <div className="col-md-12">
            <h1 className='text-center bg-light p-2'>
                {`Hello ${auth?.token && auth?.user.name }`}
            </h1>

            <h4 className='text-center'> 
                {cart?.length >= 1   ? `You've ${cart.length} Items In Your Cart ${auth?.token ? " " : "Please Login to CheckOut"  }` 
                : 'Your cart looks Empty' }
                        </h4>
        </div>

        </div>

        <div className="row ">
            <div className="col-md-8">
            <h6>Cart Items</h6>
            {
                cart.map((p) => (
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
                                <button className='remove-cart-item' onClick={()=> removeCartItem(p._id)}>X</button>
                                </div>
                            </div>
                            

                        
                        
                            
                        
                        </div>
                    </div>
                ))
            }
            </div>
            <div className="col-md-4 text-center">
            <h6>Cart Summary</h6>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>

            {auth?.user?.address ? (
            <>
                <div className='mb-3' >
                    <h4>Current Address: </h4>
                  <div align='center'>
                  <div style={{display: 'flex', justifyContent: 'center',  width: '360px'}}>
                    <h5>{auth?.user?.address} </h5>
                    <div className='updateAddressBtn' onClick={() => navigate('/dashboard/user/profile')}><BiPencil/></div>

                    </div>
                  </div>
                                  </div>
            </>
            ) : (<button style={{border: 'none', background: 'transparent', fontSize: '14px', color: 'grey'}} onClick={()=> navigate('/login',{ state: '/cart' })}>Please Login To Checkout</button>)}

            <div className='mt-2'>
            {
                !clientToken || !cart?.length ? '' : (
                    <>
                    <DropIn options={{authorization: clientToken, 
        
    }} onInstance={(instance) => setInstance(instance) } />
<button className='btn btn-primary' onClick={ handlePayment} disabled= { !auth?.user?.address }>{loading? "Processing..." : "Buy Now"}</button>
                    </>
                )
            }
            
           
    </div>
           
            </div>
          
        </div>

    </div>
   </Layout>
  )
}

export default CartPage