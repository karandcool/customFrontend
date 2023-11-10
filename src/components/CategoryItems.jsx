import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link, useNavigate, useParams } from "react-router-dom";
const CategoryItems = () => {
    const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  // const [localStorageItems, setLocalStorageItems] = useState([])
  let componentMounted = true;
  const { id } = useParams();


  useEffect(() => {

    const getProductsByCategories = async () => {
      setLoading(true);
      const response = await fetch(`https://customxpert.onrender.com/api/item/category?category=${id}`);
      const catData = await response.json()
    //   getCatProduct(catData.categoryData[0]?._id)
      if (componentMounted) {
        setData(catData);
        // setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProductsByCategories();
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

  const productDetail = (id) => {
    navigate(`/product/${id}`)
  }

  // const getCatProduct = async (categoryId) => {
  //   // (categoryId)
  //   const response = await fetch(`https://customxpert.onrender.com/api/item/category?category=${categoryId}`);
  //   setFilter(await response.json())
  // }
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5" style={{display: "contents"}}>
          {data?.map((prod, index) => {
            return(
                <div id={index} key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" onClick={() => productDetail(prod?._id)}>
                <img
                  className="card-img-top p-3"
                  src={`https://customxpert.onrender.com/${prod?.picture[0]}`}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                  {prod?.name.substring(0, 30)}....

                    {/* {prod?.name.substring(0, 12)} */}
                  </h5>
                  {/* <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p> */}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">Rs. {prod?.price}</li>
                </ul>
              </div>
            </div>
            //   <button key={index} className="btn btn-outline-dark btn-sm m-2" onClick={() => getCatProduct(prod?._id)}>{prod?.name}</button>

            )
          })}
          {data?.length === 0 &&
          <h2>No Items to display</h2>
          }
        </div>

      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Products</h2>
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

export default CategoryItems;
