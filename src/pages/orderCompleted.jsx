import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

export default () => {
  const { id } = useParams();
    const navigate = useNavigate()
  const { width, height } = useWindowSize()
  const [orderDetail, setOrderDetail]= useState()

  useEffect(() => {
    if(localStorage.getItem("token")){
      const token = JSON.parse(localStorage.getItem("token"))
      getOrderDetail(token)
    }
    
  },[])

  const getOrderDetail = async(getToken) => {
    // const response = await fetch(`https://customxpert.onrender.comapi/order/?id=${id}`);
    fetch(`https://customxpert.onrender.com/api/order/?_id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'token': `Bearer ${getToken?.token}`        
      },
    })
    .then(res => res.json())
    .then((post) => {
        setOrderDetail(post[0])
      (post)
    });
  }
  return (
    <><div style={{textAlign: '-webkit-center'}}onClick={() => navigate('/orders')}>
      <Confetti
          width={width}
          height={height} />
            <h2 style={{marginBottom: "20px"}}> Your Order Is Completed</h2>
            <div className="card text-center" style={{width: "30%"}} key={orderDetail?._id}>
              <div>
              {orderDetail?.items.map((data, index) => {
              return(
                <img style={{width:'40px', height:"40px"}} src={data?.finalcustomiseImage ? `https://customxpert.onrender.com/${data?.finalcustomiseImage}` : `https://customxpert.onrender.com/${data?.picture[0]}`  } />

              )
            })}
              </div>
                <div className="card-body">
                  <h5 className="card-title">
                  {/* {product?.name} */}

                    {/* {product?.name.substring(0, 30)}... */}
                  </h5>
                  {/* <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p> */}
                </div>
                <ul className="list-group list-group-flush">
                <li className="list-group-item lead">Quantity: {orderDetail?.totalItems}</li>
                  <li className="list-group-item lead">Price: Rs.{orderDetail?.price}</li>
                  <li className="list-group-item lead">Shipping: Rs.{orderDetail?.shipping}</li>
                  <li className="list-group-item lead">Total Price: Rs.{orderDetail?.totalPrice}</li>
                </ul>
                <div className="card-body">
                  <p className="btn btn-dark m-1">
                    Go To Orders
                  </p>
                  {/* <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button> */}
                </div>
              </div>
            </div></>
  )
}