import axios from 'axios';
import Layout from '../Components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom';
import DummyImage from '../Components/DummyImage';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayedCategory, setDisplayedCategory] = useState('');
    
  const [loadedImages, setLoadedImages] = useState([]);

    const params = useParams();
    const navigate= useNavigate();

    const getProductsBasedonCategory = async () => {
        try {
            setLoading(true); // Set loading to true when starting to fetch data

            const { data } = await axios.get(`${process.env.REACT_APP_API}/product-category/${params.slug}`);

            if (data?.success) {
                setProducts(data?.products);
                setCategory(data?.category);
                setDisplayedCategory(data?.category.name); // Set the displayed category name after loading
            } else {
                setLoading(true);
            }
        } catch (error) {
            console.log(error);
            setLoading(true);
        } finally {
            setLoading(false); // Set loading to false when data fetching is done (whether it succeeded or failed)
        }
    }

    useEffect(() => {

        

            if(params?.slug)
            products.length= 0;     
            getProductsBasedonCategory();
        
        

    }, [params.slug])


    const handleImageLoad = (productId) => {
    
        console.log(`${productId}`)
        // Add the productId to the loadedImages array
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, productId]);
      };

    return (
        <Layout>
            <div className="container">
                {products.length === 0 ? (
                    <div
                  style={{
                    height: "45vh",
                    display: "flex",
                    justifyContent: "center",
                    width: "195vh",
                    margin: "10px",
                  }}
                >
            <span className="loader" style={{ margin: "auto" }}></span>
            </div>
                ) : (
                    <div style={{marginTop: '5vh'}}>
                        <h4>{displayedCategory} Collection</h4>
                        <h6>Products Found: {products?.length}</h6>
                        
                    </div>
                )}
            </div>

            <div className="d-flex flex-wrap" style={{ marginTop: '5vh',maxWidth: '1200px' , justifyContent: 'center' }}>


              {loading ? (
      <>
        {[...Array(products.length)].map((_, index) => (
          <div className='skeleton skeleton-card' key={index}></div>
        ))}
      </>
    ) : (
      products.map((p) => (

        
        <Link to={`/product/${p.slug}`} className="productLink" key={p._id}>  
          <div className="card m-2" style={{ width: '12.8rem', border: '.6px solid #f1f1f1', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
            <img
              src={`${process.env.REACT_APP_API}/product-photo/${p._id}`}
              alt={p.name}
              className= {`product-photo ${loadedImages.includes(p._id) ? 'loaded' : ''}`}
              onLoad={() => handleImageLoad(p._id)}
            />

            {/* Show dummy image until the image for this product has loaded */}
            {!loadedImages.includes(p._id) && <DummyImage  />}

            <div className="card-body" onClick={()=> navigate(`/product/${p.slug}`)}>
              <h6 className="card-title" style={{ textAlign: 'left', whiteSpace : "normal",  textOverflow: 'ellipsis', overflow: 'hidden', maxHeight: '3em', lineHeight: '1.5em' }}>{p.name}</h6>
              <p className="card-text" style={{ whiteSpace: 'nowrap', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{p.description}</p>

              {/* Buttons */}
              <div className="card-btns" style={{cursor: 'default'}} >
                <b style={{ fontWeight: '500' }}>{`$${p.price}`}</b>
                <div  onClick={()=> navigate('/admin/dashboard')} style={{background:'orange', height: '25px', width: '25px'}}><b style={{textAlign: 'center', marginLeft: '6.5px'}}>+</b></div>
              </div>
            </div>
          </div>
        </Link>
      ))
    )}
  </div>

            
        </Layout>
    )
}

export default CategoryProduct;
