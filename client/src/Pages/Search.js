import React, { useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import { useSearch } from '../Context/Search'
import { useState } from 'react';
import DummyImage from '../Components/DummyImage';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';



const Search = () => {



  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  

    const query = queryParams.get('q');


    const [value, setValue] = useSearch()


    const [products, setProducts] = useState([]);


    const[loading ,setLoading] = useState(true);
    
    const navigate= useNavigate();
    
    const [loadedImages, setLoadedImages] = useState([]);
    



    useEffect(()=> {
      if(query) {
        performSearch(query);
      }
    },[query])


    const performSearch = async(query) => {
        try{
         
          const {data} = await axios.get(`${process.env.REACT_APP_API}/search/${query}`);
          setValue({query, results: data});
            setLoading(false);
            
            
          }catch(error) {
            console.log(error)
            setLoading(false);
        } 
         
    }


    const handleImageLoad = (productId) => {
    
        console.log(`${productId}`)
        // Add the productId to the loadedImages array
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, productId]);
      };
    
    
    

  return (
    <Layout>
        <div className='container'>
            <div className='text-center'>
                <h6>Total Results {value?.results.length < 1 ? 'No Products Found' : `Found ${value?.results.length}`}</h6>
            </div>
            <div className="d-flex flex-wrap" style={{marginTop: '2vh' ,  justifyContent: 'center'}}> 
            
            {/* If products length is zero , show loader and when we get the products length just show skeletons of cards of product  length and then just show the actual data   */}
            {value?.results.length <= 0 && !loading ? (
                    <h6>No Data</h6>
) : 

(   
  
  <div className="d-flex flex-wrap" style={{ marginTop: '2vh',maxWidth: '1200px' , justifyContent: 'center' }}>

    { loading ? (
      <>
      <div style={{ height: '45vh', display: 'flex', justifyContent: 'center', width: '195vh', margin: '10px' }}>
    <span className="loader" style={{ margin: 'auto' }}></span>
  </div>
      </>
    ) : (
      value.results.map((p) => (
        <Link to={`/dashboard/admin/product/${p.slug}`} className="productLink" key={p._id}>
          <div className="card m-2" style={{ width: '12.8rem', border: '.6px solid #f1f1f1', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
            <img
              src={`${process.env.REACT_APP_API}/product-photo/${p._id}`}
              alt={p.name}
              className= {`product-photo ${loadedImages.includes(p._id) ? 'loaded' : ''}`}
              onLoad={() => handleImageLoad(p._id)}
            />

            {/* Show dummy image until the image for this product has loaded */}
            {!loadedImages.includes(p._id) && <DummyImage  />}

            <div className="card-body">
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
)}
        </div>
        </div>
    </Layout>

  )
}

export default Search