import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import DummyImage from "../Components/DummyImage";
 import { Checkbox } from "antd";
 import {Radio as Radios} from 'antd'

import { Prices } from "../Components/Prices";

import { useCart } from "../Context/cart";



const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const[loading ,setLoading] = useState(true);

  const [loadedImages, setLoadedImages] = useState([]);

  const [checked , setChecked] = useState([]); // we put array in checked state coz , multiple values can be checked by user
  const [radio , setRadio] = useState([]); // we put array in checked state coz , multiple values can be checked by user


  const [total, setTotal]  = useState(0);
  const [page, setPage]  = useState(1);
  

  const [loadmore , setLoadMore] = useState(false);

  const [cart, setCart] = useCart();



    
  const navigate = useNavigate();
  

  const getAllCategories = async() => {
    try {

      const {data} = await axios.get(`${process.env.REACT_APP_API}/category`);
      
      if(data?.success) {

        setCategories(data?.category);
      
      }

    }catch(error) {
      
      console.log(error);
      
    }
  }


    useEffect(()=> {
      getAllCategories();
     
    }, [])
  
 // get all products 

  const getAllProducts = async() => {
    try{  
      setLoading(true);
      const {data} = await axios.get(`${process.env.REACT_APP_API}/fetch-products/${page}`) // here we gave our page variable which we set initially as 1 to fetch 12 products 
      setLoading(false);

      // if(data?.success) {
      //   setProducts(data.products);
      // }  

      if(page===1) {
        setProducts(data?.products);
      } 

      else {

     
        // toast.error("")
      }

    }catch(error){
      console.log(error);

    }
    
  }

useEffect(()=> {
  setLoading(true);
if(!checked.length || !radio.length)  getAllProducts().then(() => {
 
  setLoading(false)

  //  setTimeout(() => {
  //   setLoading(false);
  //  } , 200)
    
  })
}, [])


useEffect(()=> {

  getTotal();
  if(checked.length || radio.length) {

    setLoading(true);
    filteredProduct().then(()=> {
    setTimeout(()=> {
      setLoading(false);
    },100)
    })
  }

}, [checked, radio])


// Filter By Category 

  const handleFilter = (value,id) => {
        let all = [...checked]
      if(value) {
        all.push(id);
      }
       else {
       all = all.filter((c) => c!==id)
      }

      setChecked(all);
    
    }


/// get filtered product 

 const filteredProduct = async(id) => {
  try {
    
    setProducts([]);
    setLoadedImages([]);
    
    const {data} = await axios.post(`${process.env.REACT_APP_API}/products-filters`, {checked, radio})
    
    
    
      if(!data.products) {
        toast.error(data.message);
        getAllProducts();
      }  else {
        
        setProducts(data?.products)
        
        
        

      }

      
     
    


  }catch(error) {
    setLoading(false)
    console.log(error)
  }
 }



  const handleImageLoad = (productId) => {
    
    console.log(`${productId}`)
    // Add the productId to the loadedImages array
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, productId]);
  };






  // get Total count of products 

  const getTotal = async() => {
    try {

      const {data} = await axios.get(`${process.env.REACT_APP_API}/product-count`,)
      setTotal(data?.totalProducts)

    } catch (error) {
      console.log(error)
    }
  }


  // load more products 
useEffect(()=> {
  if(page==1) return  /// it means if page == 1 dont do anything , but if page increases , just call loadmoreProducts 
  loadMoreProducts();
},[page])

  const loadMoreProducts = async() => {
    try{
      setLoadMore(true);
      
      const  {data} = await axios.get(`${process.env.REACT_APP_API}/fetch-products/${page}`);
      setProducts([...products, ...data?.products]);
      setLoadMore(false)
   
      
    }catch(error) {
      setLoadMore(false);
      console.log(error)
    }
  }
  



  // addtocart items 

   const addItemToCart = (product) => {
    try{

      const userId = auth?.user?._id;

    // Add the userId property to the item
    const cartItem = { ...product,  userId };

    // Add the item to the cart
    setCart( (prevCart) => [...prevCart, cartItem]);
  // Update local storage
  const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const updatedCart = [...storedCart, cartItem];
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));


    toast.success("Product Added To Cart")

      

    }catch(error) {
      console.log(error)
    }
   }



  return (
    <Layout title={"All Products/ Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-3" style={{marginTop: '6vh'}}>


    {/* Filter By Category  */}


        {/* {JSON.stringify(checked,null, 4)} */}
          <h4 className="text-center">Filter Products</h4>
          <div style={{display: "flex", justifyContent: 'center',}}>

         
        <div className="Home-Category" >

        {categories.length === 0 ? (
  <>
    {[...Array(8)].map((_, index) => (
      <div key={`skeleton-${index}`} className='skeleton skeleton-categories'></div>
    ))}
  </>
) : (
  <div style={{marginTop: '.5rem'}}>
    <h6 className="text-center">Filter By Category</h6>
    {categories.map((c) => (
      <div key={c._id}>
        <Checkbox key={`checkbox-${c._id}`} onChange={(e) => { handleFilter(e.target.checked, c._id) }}>{c.name}</Checkbox>
      </div>
    ))}
  </div>
)}

        </div>
      </div>
            
              
            <br/>

{/* Filter By Price */}

      
          <div style={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            
            
            { categories.length === 0 ? 

                <div style={{display: "flex", flexDirection: 'column', justifyContent: 'start',alignItems: 'center'}}>
             {   
                              [...Array(8)].map((_,index) => (
                  <div key={`skele-${index}`} className='skeleton skeleton-categories'></div> 
                ))
          
               
              }
          
              
                </div>

            
            : ( <div style={{marginLeft: '-20px'}}>
            <h6 className="text-center" >Filter By Price</h6>

              <Radios.Group onChange={(e)=> setRadio(e.target.value)}>
            
            {
              Prices.map((price) => (
              <div key={price._id}>
              <Radios  value={price.array}>{price.name}</Radios>
              </div>

              ))
            }
            </Radios.Group>  
            <br/>

            <button style={{ background: 'black', color:'white', border: 'none', width: '100%', height:'30px', marginTop: '15px' }} onClick={()=>window.location.reload()}>Reset</button>
            
           
            
            </div>
            
            )
            }
            
           
          
        
      </div>




        </div>

            


        
        <div className="col-md-9"  style={{marginTop: '6vh'}}>
          <div className="text-center">


{/* All Products  */}

            <h2 style={{textAlign: 'left'}}>All Products </h2>
            <div className="d-flex flex-wrap" style={{marginTop: '2vh', marginLeft : '1.5rem' ,  justifyContent: 'center'}}> 
            
            {/* If products length is zero , show loader and when we get the products length just show skeletons of cards of product  length and then just show the actual data   */}
            {products.length === 0 ? (
  <div style={{ height: '45vh', display: 'flex', justifyContent: 'center', width: '100vh', margin: '10px' }}>
    <span className="loader" style={{ margin: 'auto' }}></span>
  </div>
) : 

(   
  
  <div className="d-flex flex-wrap" style={{ marginTop: '2vh',maxWidth: '1200px' , justifyContent: 'center' }}>

    {loading ? (
      <>
        {[...Array(products.length)].map((_, index) => (
          <div className='skeleton skeleton-card' key={index}></div>
        ))}
      </>
    ) : (
      products.map((p) => (

        
        <div  className="productLink" key={p._id}>  
          <div className="card m-2" style={{ width: '12.8rem', border: '.6px solid #f1f1f1', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
            <img
              src={`${process.env.REACT_APP_API}/product-photo/${p._id}`}
              alt={p.name}
              style={{cursor: 'pointer'}}
              className= {`product-photo ${loadedImages.includes(p._id) ? 'loaded' : ''}`}
              onLoad={() => handleImageLoad(p._id)}
              onClick={()=> navigate(`/product/${p.slug}`)}
            />

            {/* Show dummy image until the image for this product has loaded */}
            {!loadedImages.includes(p._id) && <DummyImage  />}

            <div className="card-body"  style={{cursor: 'pointer'}}>
              <h6 className="card-title" style={{ textAlign: 'left', whiteSpace : "normal",  textOverflow: 'ellipsis', overflow: 'hidden', maxHeight: '3em', lineHeight: '1.5em' }}>{p.name}</h6>
              <p className="card-text" style={{ whiteSpace: 'nowrap', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{p.description}</p>

              {/* Buttons */}
              <div className="card-btns" style={{cursor: 'default'}} >
                <b style={{ fontWeight: '500' }}>{`$${p.price}`}</b>
                <div  onClick={()=> addItemToCart(p) } className="addToCart"><b>+</b></div>
                  
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
)}


            
            </div>

          {/*  load More Products  */}

<div className="m-2 p-3">
  {products && products.length !== total? <button  className="loadmore-btn"  style={{background: loadmore? 'transparent' : 'black', color: 'white', border: 'none'}} onClick={(e) => (setPage(page+1))}>{loadmore? (  <span className="loader" style={{ margin: 'auto', width: '35px' , height: '35px'}}></span>)
   : ('Load More' )}</button>  : ''}
</div>


          </div>
        </div>
      </div>

      {/* <h1>Home Page</h1>
        
        <pre>{JSON.stringify(auth, null,4)}</pre> */}
    </Layout>
  );
};

export default Home;
