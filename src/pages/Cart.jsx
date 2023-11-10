import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
// import { addCart, delCart } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, InputGroup, Form, Row, Col, } from "react-bootstrap"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { CheckoutProvider, Checkout, injectCheckout} from 'paytm-blink-checkout-react'
import axios from "axios";
import "./cart.css"

const Cart = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [address, setAddress] = useState({
    mobileNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode:"",
    country: "",
    saveAs: ""
  })

  const [state, setState] = useState()
  const [token, setToken] = useState()
  let subtotal = 0;
    let shipping = 50.0;
    let totalItems = 0;

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setToken(JSON.parse(localStorage.getItem("token")))
      getCartData(JSON.parse(localStorage.getItem("token")))
    } else{
      setCart()

    }
  },[])
  
  const getCartData = (getToken) => {
    fetch("https://customxpert.onrender.com/api/cart", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
                      'token': `Bearer ${getToken?.token}`        
          },
        })
        .then(res => res.json())
        .then((post) => {
            localStorage.removeItem("items")
            setItemsInCart(post)
            // setState(post?.items)
          
        });
  }

  const setItemsInCart = (data) => {
    const newArray = []
    data?.items?.map((item) => {
      
      newArray.push({ ...item.item, qty: item.qty,fontSize: item?.fontSize, fontFamily: item?.fontFamily, finalcustomiseImage: item?.finalcustomiseImage, selectedText:item?.selectedText, customisePrice : item?.customisePrice, customImage: item?.customImage, selectedSize: item?.selectedSize, selectedColor: item?.selectedColor, } )
      // dispatch(addCart(item))

    })
    setState(newArray)
    (newArray)

  }

  const setCart = () => {
      setState(JSON.parse(localStorage.getItem("items")))
  }
  const goToCheckout = () => {
    if(token) {
      // setShowAddressModal(true)
    }else{
      navigate("/login")
    }
  }
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product, index) => {
    
    if(token) {
      
      fetch("https://customxpert.onrender.com/api/cart/addItem", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'token': `Bearer ${token?.token}`
          },
          body: JSON.stringify({'index': index })
        })
        .then(res => res.json())
        .then((post) => {
          getCartData(token)
          // alert("Item is Incremented")
          (post)
        });

    } else{
    
    const Bruno = state.findIndex((person) => person === product)
    const newData = [...state]
    newData[Bruno]['qty'] += 1
    localStorage.setItem("items", JSON.stringify(newData))
    
    setCart()
    }
    

  };
  const removeItem = (product, index) => {

    if(token) {
      fetch("https://customxpert.onrender.com/api/cart/removeItem", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'token': `Bearer ${token?.token}`,
                             
          },
          body: JSON.stringify({'index': index })
        })
        .then(res => res.json())
        .then((post) => {
          getCartData(token)
          // alert("Decremented")
          (post)
        });
    
    } else{
      const Bruno = state.findIndex((person) => person === product)
    const newData = [...state]
    if(newData[Bruno]['qty'] > 1) {
      newData[Bruno]['qty'] -= 1
    localStorage.setItem("items", JSON.stringify(newData)) 
    setCart()
    }
  }
    

  };
  const deleteItem = (product, index) => {
    if(token) {
      fetch("https://customxpert.onrender.com/api/cart/deleteItem", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'token': `Bearer ${token?.token}`,
                             
          },
          body: JSON.stringify({'index': index })
        })
        .then(res => res.json())
        .then((post) => {
          
          getCartData(token)
          // alert("Decremented")
          
        });
    }else{

    
    const Bruno = state.findIndex((person) => person === product)
    const newData = [...state]
    newData.splice(Bruno, 1)
    localStorage.setItem("items", JSON.stringify(newData)) 
    setCart()
  }

  };

  const placeOrder = () => {
   
    const data = {
      items: state,
      totalItems:totalItems,
      price: subtotal,
      shipping:shipping,
      totalPrice: subtotal + shipping,
      paymentMode: "paytm",
      paymentStatus: "Confirm",
      orderStatus: 'Pending',

    }
    fetch("https://customxpert.onrender.comapi/order", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'token': `Bearer ${token?.token}`
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((post) => {
          
          navigate(`/order-completed/${post.message._id}`)
        });
  }
  const paymentHandler = async (e) => {
    if(token) {
      const API_URL = 'https://customxpert.onrender.com/api/order/'
    // e.preventDefault();
    const orderUrl = `${API_URL}razor`;
    // const response = await axios.get(orderUrl);
    const response = await axios
      .post(orderUrl, {
        amount: subtotal + shipping,
        // receipt: "This is a new post."
      })
      .then((response) => {
        return response
       
      });
    const { data } = response;
    const orderData = {
      items: state,
      totalItems:totalItems,
      price: subtotal,
      shipping:shipping,
      totalPrice: subtotal + shipping,
      paymentMode: "paytm",
      paymentStatus: "Confirm",
      orderStatus: 'Pending',

    }
    const options = {
      key: "rzp_test_0vDZwn2F8aArez",
      name: "CustomXpert",
      description: "Customise Clthing items",
      order_id: data.id,
      handler: async (response) => {
       
        
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
        //  const captureResponse = await axios.post(url, {amount: data.amount})
         const captureResponse = await axios.post(url, {
        amount: data?.amount,
        orderData: orderData,
        address:address,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature:response.razorpay_signature

      }, {
        headers: {
            token: `Bearer ${token?.token}`,
            'MyCustomHeader2': '2'
        }
    })
      .then((response) => {
        if(response.data.orderStatus === 200) {
          navigate(`/order-completed/${response.data.message._id}`)
        }
        
       
      });
        
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    }else{
navigate("/login")
    }
    	
  }
const confirm = () => {
  setShowModal(true)
}
const deleteCartData = () => {
  
  fetch("https://customxpert.onrender.com/api/cart", {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json',
                      'token': `Bearer ${token?.token}`
          },
          
        })
        .then(res => res.json())
        .then((post) => {
          setShowModal(false)
          setState([])
        });
}

const onAddressChange = (e) => {
  e.preventDefault();
  setAddress({...address,[e.target.name]: e.target.value});
}


state?.map((item) => {
  return (subtotal += parseInt(item?.price + (item?.customisePrice ? item?.customisePrice : 0)) * parseFloat(item?.qty));
});

state?.map((item) => {
  return (totalItems += item?.qty);
});
  const ShowCart = () => {

    
    return (
      <>
        {/* <section className="h-100 gradient-custom"> */}
      
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  
                  <div className="card-body">
                    {state.map((item, index) => {
                     
                      return (
                        <div key={item.id}>
                          <div className="row d-flex align-items-center" style={{textAlignLast: 'center',
    textAlign: '-webkit-center'}}>
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                  src={`https://customxpert.onrender.com/${item?.finalcustomiseImage ? item?.finalcustomiseImage : item?.picture[0]}`}
                  // className="w-100"
                                  alt={item?.name}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 ">
                              <p>
                                <strong>{item?.name}</strong>
                              </p>
                              {item?.selectedColor && item?.selectedSize &&
                              <p>
                                <p>
                                 Size: <strong>{" " + item?.selectedSize + " "}</strong>
                                 Color:<strong style={{color: item?.selectedColor}}>{" " + item?.selectedColor + " "}</strong>
                                </p>
                                

                              </p>
                    }
                              
                              
                              {item?.customisePrice > 0 &&
                              <>
                              <p>Item Price : Rs. {item?.price}</p>
                              <p>Customise Price : Rs.{item?.customisePrice}</p>
                              </>
                    }

                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>

                            <div className="col-lg-4 col-md-5 col-sm-4 col-xs-4 ">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "200px" }}
                              >
                                {item?.qty === 1 && 
                                <button
                                className="btn px-3"
                                onClick={() => {
                                  deleteItem(item, index);
                                }}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                                }
                                {item?.qty > 1 &&
                                <button
                                className="btn px-3"
                                onClick={() => {
                                  removeItem(item, index);
                                }}
                                disabled={item?.qty === 1}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              }
                                

                                <p className="mx-5">{item?.qty}</p>

                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    addItem(item, index);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">{item?.qty}</span>{" "}
                                  x Rs{item?.customisePrice ? item?.price + item?.customisePrice :item?.price }
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                  
                </div>
                <button className="btn btn-dark m-1" onClick={() => confirm()} >
                    Clear All
                  </button>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})<span>Rs.{Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>Rs.{shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>Rs.{Math.round(subtotal + shipping)}</strong>
                        </span>
                        
                      </li>
                    </ul>

                    <button
                      onClick={() => goToCheckout() }
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">Are You Sure You Want To Delete Cart Data ?</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteCartData() }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      

      
      
        {/* </section> */}
      </>
    );
  };

  return (
    <>
      <Navbar />
      {showAddressModal &&
        <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Details Here</Modal.Title>
        </Modal.Header>
        <div>
        <Modal.Body>
          <h3>Your total Amount : Rs {subtotal + shipping}</h3>
        <Row>
          <Col >
            <Form >
            <Form.Group >
                <Form.Label>
                 Mobile Number
                </Form.Label>
                <Form.Control  type="number" name="mobileNumber" placeholder="Mobile Number" value={address?.mobileNumber} onChange={(e) => onAddressChange(e) }/>
                </Form.Group>
              <Form.Group>
                <Form.Label>
                  Delivery Address Line 1
                </Form.Label>
                <Form.Control  type="text" name="addressLine1" placeholder="addressLine1" value={address?.addressLine1} onChange={(e) => onAddressChange(e)}/>
                </Form.Group>
                <Form.Group>
                <Form.Label>
                Delivery Address Line 2
                </Form.Label>
                <Form.Control  type="text" name="addressLine2" placeholder="addressLine2"  value={address?.addressLine2} onChange={(e) => onAddressChange(e)}/>
                </Form.Group>
                <Form.Group>
                <Form.Label>
                  City
                </Form.Label>
                <Form.Control  type="text" name="city" placeholder="city"  value={address?.city} onChange={(e) => onAddressChange(e)}/>
                </Form.Group>
                <Form.Group>
                <Form.Label>
                  Pincode
                </Form.Label>
                <Form.Control  type="text" name="pincode" placeholder="pincode"  value={address?.pincode} onChange={(e) => onAddressChange(e)}/>
                </Form.Group>
                <Form.Group>
                <Form.Label>
                  State
                </Form.Label>
                <Form.Control  type="text" name="state" placeholder="state"  value={address?.state} onChange={(e) => onAddressChange(e)}/>
                </Form.Group>
                <Form.Group>
                <Form.Label>
                  Country
                </Form.Label>
                <Form.Control  type="text" name="country" placeholder="country "  value={address?.country} onChange={(e) => onAddressChange(e)}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Save As
                </Form.Label>
                <Form.Control  type="text" name="saveAs" placeholder="Home/Office/Friends "  value={address?.saveAs} onChange={(e) => onAddressChange(e)}/>
              </Form.Group>
             
            </Form>
          </Col>
        </Row>
        
        
       
          </Modal.Body>
        </div>
        
        <Modal.Footer>
          <Button variant="default" onClick={() => setShowAddressModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" disabled={(address.mobileNumber && address.addressLine1 && address.city && address.state && address.country) ? false : true} onClick={() => paymentHandler() }>
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>      }
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state?.length > 0 ? <ShowCart /> : <EmptyCart />}
       
      </div>
      <Footer />
    </>
  );
};

export default Cart;
