import React, { useState, useEffect } from "react";
// import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;


//   const addProduct = (product) => {
//     if(localStorage.getItem("token")) {
//       product.qty = 1
//       (product)
// addToCart(JSON.parse(localStorage.getItem("token")), [product])
//     } else{
//       const products = JSON.parse(localStorage.getItem("items"))
//     product['qty'] = 1
//     (products)
//     let addItem = []
//     if(products) {
//       addItem = [...products, product]
//     }   else{
//       addItem = [ product]

//     }
    
//     (addItem)
//     localStorage.setItem("items", JSON.stringify(addItem))
//     }    
//   };
  // const addToCart = (token, cartItems) => {
  //   fetch("https://customxpert.onrender.comapi/cart", {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json',
  //                     'token': `Bearer ${token.token}`        
  //         },
  //         body: JSON.stringify(cartItems)
  //       })
  //       .then(res => res.json())
  //       .then((post) => {
  //         alert("Item is Added to Cart Api")
  //         (post)
  //       });
  // }

  useEffect(() => {
    // if(localStorage.getItem("items")) {
    //   setLocalStorageItems(JSON.parse(localStorage.getItem("items")))
    // } 
    const getCategories = async () => {
      setLoading(true);
      const response = await fetch("https://customxpert.onrender.com/api/category");
      const catData = await response.json()
      getCatProduct(catData.categoryData[0]?._id)
      if (componentMounted) {
        setData(catData);
        // setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getCategories();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const getCatProduct = async (categoryId) => {
    // (categoryId)
    const response = await fetch(`https://customxpert.onrender.com/api/item/category?category=${categoryId}`);
    setFilter(await response.json())
  }

  // const filterProduct = (cat) => {
  //   const updatedList = data.categoryData.filter((item) => item.category === cat);
  //   setFilter(updatedList);
  // }
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          {data?.categoryData?.map((cat, index) => {
            return(
              <button key={index} className="btn btn-outline-dark btn-sm m-2" onClick={() => getCatProduct(cat?._id)}>{cat?.name}</button>

            )
          })}
          {/* <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>All</button> */}
          {/* <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("women's clothing")}>
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("electronics")}>Electronics</button> */}
        </div>

        {filter.map((product) => {
          return (
            <div id={product._id} key={product._id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <Link to={"/product/" + product._id} style={{textDecoration:'none'}}>

              
              <div className="card text-center h-100" key={product._id}>
                <img
                  className="card-img-top p-3"
                  src={`https://customxpert.onrender.com/${product?.picture[0]}`}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                  {/* {product?.name} */}

                    {product?.name.substring(0, 30)}...
                  </h5>
                  {/* <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p> */}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">Rs.{product?.price}</li>
                </ul>
                <div className="card-body">
                  <p className="btn btn-dark m-1">
                    Show More
                  </p>
                  {/* <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button> */}
                </div>
              </div>
              </Link>
            </div>

          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Trending Categories</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
