import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
// import { addCart } from "../redux/action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer, Navbar } from "../components";
import RadioButton from "../components/radioButton";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [product, setProduct] = useState();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [count, setCount] = useState(0)
  const [add, setAdd] = useState(true)
  let componentMounted = true;

  const addProduct = async (product) => {
    
    if( (product?.selectedSize?.split(/[.?!]/g).filter(Boolean).length + product?.selectedColor?.split(/[.?!]/g).filter(Boolean).length == count) || count == 0 ) {
      setAdd(true)
      if(localStorage.getItem("token")) {
        product.qty = 1
        
  addToCart(JSON.parse(localStorage.getItem("token")), [product])
      } else{
        const products = JSON.parse(localStorage.getItem("items"))
      product['qty'] = 1
      
      let addItem = []
      if(products) {
        addItem = [...products, product]
      }   else{
        addItem = [ product]
  
      }
      
      
      localStorage.setItem("items", JSON.stringify(addItem))
      }
      toast("Item Added To Cart", {autoClose:2000});
    } else{
      setAdd(false)
    }
    
    
    
    // dispatch(addCart(product))

  };
  const addToCart = (token, cartItems) => {
    fetch("https://customxpert.onrender.com/api/cart", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'token': `Bearer ${token.token}`        
          },
          body: JSON.stringify(cartItems)
        })
        .then(res => res.json())
        .then((post) => {
          alert("Item is Added to Cart Api")
          
        });
  }
  

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      const response = await fetch(`https://customxpert.onrender.com/api/item/getById?id=${id}`);
      
      const data = await response.json();
      let dataCount = 0
      if(data?.allSizes.length > 0) {
        dataCount += 1
      }
      if(data?.allColors.length > 0) {
        dataCount += 1
      }
      setCount(dataCount)
    
      setProduct(data);
      getProductsByCategories(data)
      setLoading(false);
      // const response2 = await fetch(
      //   `https://fakestoreapi.com/products/category/${data.category}`
      // );
      // const data2 = await response2.json();
      // setSimilarProducts(data2);
      setLoading2(false);
    };
    getProduct();
  }, [id]);

  const getProductsByCategories = async (data) => {
    setLoading(true);
    
    const response = await fetch(`https://customxpert.onrender.com/api/item/category?category=${data?.categoryId}`);
    const catData = await response.json()
  //   getCatProduct(catData.categoryData[0]?._id)
    if (componentMounted) {
      setSimilarProducts(catData);
      // setFilter(await response.json());
      setLoading(false);
    }

    return () => {
      componentMounted = false;
    };
  };

  const handleCheck = input => e => {
    // input value from the form
    const {value } = e.target;
    product[input] = value
    (typeof(product?.selectedSize?.split(/[.?!]/g).filter(Boolean).length))
    (typeof(product?.selectedColor?.split(/[.?!]/g).filter(Boolean).length))

    // values[input] = value

    // // //updating for data state taking previous state and then adding new value to create new object
    // (values)
  }

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={`https://customxpert.onrender.com/${product?.picture[0]}`}
                alt={product?.name}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              {/* <h4 className="text-uppercase text-muted">{product?.categoryId}</h4> */}
              <h1 className="display-5">{product?.name}</h1>
              {/* <p className="lead">
                {product?.rating && product?.rating?.rate}{" "}
                <i className="fa fa-star"></i>
              </p> */}
              <h3 className="display-6  my-4">Rs.{product?.price}</h3>
                      {(product?.allSizes || product?.allColors) && 
                                            <RadioButton handleData={handleCheck} allColors={product?.allColors} availableColors={product?.availableColor} allSizes={product?.allSizes} availableSize={product?.availableSize}/>

                      }
                      {!add && 
                      <p style={{color: "red"}}>Please Select your Preferences</p>}


              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product, 'add')}
              >
                Add to Cart
              </button>
              <ToastContainer />
              {/* <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product, 'buyNow')}
              >
                Buy Now
              </button> */}
              <p className="lead">{product?.description}</p>

            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };
  const goToItem = (id) => {
    navigate(`/product/${id}`)
  }
  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            { similarProducts.length > 0 && similarProducts.map((item) => {
             
              return (
               
                <div key={item?._id} className="card mx-4 text-center" onClick={() => goToItem(item?._id)}>
                  <img
                    className="card-img-top p-3"
                    src={`https://customxpert.onrender.com/${item?.picture[0]}`}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item?.name}...
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">Rs.{item?.price}</li>
                </ul>
                  </div>
                 
                
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
          <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
