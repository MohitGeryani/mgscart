import React, { useEffect, useState } from 'react';
import AdminMenu from '../../Components/Layout/AdminMenu';
import Layout from '../../Components/Layout/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DummyImage from '../../Components/DummyImage';
import Spinner from '../../Components/Spinner';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/get-product`);
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error('Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error in Fetching Products');
    }
  };

  useEffect(() => {
    getAllProducts()
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const [loadedImages, setLoadedImages] = useState([]);

  const handleImageLoad = (productId) => {
    // Add the productId to the loadedImages array
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, productId]);
  };

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>


            <div className="d-flex m-0" style={{flexWrap: 'wrap', gap: '1px'}}>
            
              { products.length === 0 ?  <div style={{height: '55vh' , display: 'flex', justifyContent: 'center',width: '195vh', margin: '20px'}}>
              <span className="loader" style={{margin: 'auto'}} ></span> 
              </div>
              :  
                
                
                loading ? (
                <>
                {[...Array(products.length)].map((index) => (
       
      <div className='skeleton skeleton-card'></div>
    
     
    
    
   

      )) }
                </>
              ) : (
                products?.map((p) => (
                  <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="productLink">
                    <div className="card m-2" style={{ width: '12.8rem' }}>
                      <img
                        src={`${process.env.REACT_APP_API}/product-photo/${p._id}`}
                        alt={p.name}
                        className={`product-photo ${loadedImages.includes(p._id) ? 'loaded' : ''}`}
                        onLoad={() => handleImageLoad(p._id)} // Set to true when image loads
                      
                     
                      />

                      {/* Show dummy image until the image for this product has loaded */}
                      {!loadedImages.includes(p._id) && <DummyImage />}

                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.name}</p>
                       
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
