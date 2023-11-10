import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link, useNavigate } from "react-router-dom";
const CategoryCard = () => {
    const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [localStorageItems, setLocalStorageItems] = useState([])
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    setLocalStorageItems(product)
    localStorage.setItem("items", [JSON.stringify(localStorageItems)])

  //   const array = []
  // if(localStorageItems.length > 0) {
  //   array.push(...localStorageItems, product)
  //   localStorage.setItem("items", JSON.stringify(array))

  // }else{
  //   setLocalStorageItems(product)
  //   localStorage.setItem("items", JSON.stringify(product))
  // } 
    //  dispatch(addCart(product))
  }

  useEffect(() => {
    // if(localStorage.getItem("items")) {
    //   setLocalStorageItems(JSON.parse(localStorage.getItem("items")))
    // } 
    const getCategories = async () => {
      setLoading(true);
      const response = await fetch("https://customxpert.onrender.com/api/category");
      const catData = await response.json()
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
  const CategoryItems = (id) => {
    navigate(`/category/${id}`)
  }
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-2" style={{display: "contents"}}>
          {data?.categoryData?.map((cat, index) => {
            return(
                    
                <div id={index} key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" >
              <div  className="card text-center h-100" style={{cursor: "pointer"}} onClick={()=> CategoryItems(cat._id)}>
                <img
                  className="card-img-top p-3"
                  src={`https://customxpert.onrender.com/${cat?.picture}`}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {cat?.name.substring(0, 12)}
                  </h5>
                </div>
              </div>
            </div>

            )
          })}
        </div>

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

export default CategoryCard;
