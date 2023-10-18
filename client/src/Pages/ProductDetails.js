import React, { useEffect, useState } from "react";
import Layout from "./../Components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import DummyImage from "../Components/DummyImage";
import ProductDummyImage from "../Components/ProductDummyImage";

const ProductDetails = () => {
  const [product, setProduct] = useState({}); // here we used object coz  we have a single product
  const params = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [loadedImages, setLoadedImages] = useState([]);


  const [loadedDetails, setloadedDetails] = useState(false);

  const [productimage, setProductImage] = useState(false);
  const [imageError, setImageError] = useState(false);



  const imageURL = product._id
    ? `${process.env.REACT_APP_API}/product-photo/${product._id}`
    : "";

  // Get Similar Products

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // get product

  useEffect(() => {
   
    if (params?.slug) {
      const getProduct = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/get-product/${params.slug}`
        );

        if (data?.product) {
          setProduct(data?.product);
          setloadedDetails(true)
          
        }
        getSimilarProducts(data?.product._id, data?.product.category._id);
      };
      getProduct().then(()=> {
        setProductImage(true)
      })
    }
  }, [params?.slug]);

  const handleImageLoad = (productId) => {
    console.log(`${productId}`);
    // Add the productId to the loadedImages array
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, productId]);
  };

  {
    /* {JSON.stringify(product, null, 4)} its to check if the data is coming or not */
  }
  return (
    <Layout>
      <div className="row container mt-5">
        <div className="col-md-6 text-center">
          {loadedDetails ? (
            <div id="ProductDetailPhoto">
              {productimage ? (
                <img
                  src={imageURL}
                  className="Product_Details_photo"
                  
                />
              ) : 
                <ProductDummyImage/>
              }
              <div className="addorbuycontainer">
                <button>Add to Cart</button>
                <button>Buy Now</button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="col-md-6 mt-4">
          {loadedDetails ? (
            <div className="product-details-container">
              <h1>Product Details</h1>
              <h6>Name: {product.name}</h6>
              {product.category && <h6>Category: {product.category.name}</h6>}
              <h6>Price: {product.price}</h6>

              <h6>Description: {product.description}</h6>
            </div>
          ) : (
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
          )}
        </div>
      </div>



     { loadedDetails  ? ( <div className="row container" style={{marginTop: '5vh'}}>
   
        <h4>Similar Products </h4>

        {relatedProducts.length <= 0 && !loading ? (
          <h6 className="text-center">No Similar Product Found</h6>
        ) : (
          <div
            className="d-flex flex-wrap"
            style={{
              marginTop: "2vh",
              maxWidth: "1200px",
              justifyContent: "left",
            }}
          >
            {loading && !product.length && !loadedDetails ? (
              <>
               
                  <span className="loader" style={{ margin: "auto" }}></span>
                
              </>
            ) : (
              relatedProducts.map((p) => (
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="productLink"
                  key={p._id}
                >
                  <div
                    className="card m-2"
                    style={{
                      width: "12.8rem",
                      border: ".6px solid #f1f1f1",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/product-photo/${p._id}`}
                      alt={p.name}
                      className={`product-photo ${
                        loadedImages.includes(p._id) ? "loaded" : ""
                      }`}
                      onLoad={() => handleImageLoad(p._id)}
                    />

                    {/* Show dummy image until the image for this product has loaded */}
                    {!loadedImages.includes(p._id) && <DummyImage />}

                    <div className="card-body">
                      <h6
                        className="card-title"
                        style={{
                          textAlign: "left",
                          whiteSpace: "normal",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxHeight: "3em",
                          lineHeight: "1.5em",
                        }}
                      >
                        {p.name}
                      </h6>
                      <p
                        className="card-text"
                        style={{
                          whiteSpace: "nowrap",
                          fontSize: "13px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                        }}
                      >
                        {p.description}
                      </p>

                      {/* Buttons */}
                      <div className="card-btns" style={{ cursor: "default" }}>
                        <b style={{ fontWeight: "500" }}>{`$${p.price}`}</b>
                        <div
                          onClick={() => navigate("/admin/dashboard")}
                          style={{
                            background: "orange",
                            height: "25px",
                            width: "25px",
                          }}
                        >
                          <b
                            style={{ textAlign: "center", marginLeft: "6.5px" }}
                          >
                            +
                          </b>
                        </div>
            
                      </div>
                    </div>
            
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div> ) : <></> }
    </Layout>
  );
};

export default ProductDetails;
