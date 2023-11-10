import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useEffect, useState } from 'react';


const Login = () => {
  const navigate = useNavigate()
  const [loginForm, setLoginForm] = useState({ email: "", password: ""})
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    checkToken()
},[])
const checkToken = () => {
  setCartItems(JSON.parse(localStorage.getItem("items")))
    if(localStorage.getItem("token")){
        navigate(-1)
    }
}
  const handleInputChange = (e) => {
   
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value})
  }
  const submitLogin = (e) => {
    e.preventDefault()
    fetch("https://customxpert.onrender.com/api/user/signin", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginForm)
        })
        .then(res => res.json())
        .then( (post) => {
          if(post.token) {
            addToCart(post.token)
            localStorage.setItem("token", JSON.stringify(post))
            
              navigate((-1), {replace : true})
            
           
          }
          else{
            alert(post?.message)
          }
          
        });
  }

  const addToCart = (token) => {
    fetch("https://customxpert.onrender.com/api/cart", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'token': `Bearer ${token}`        
          },
          body: JSON.stringify(cartItems)
        })
        .then(res => res.json())
        .then((post) => {
            localStorage.removeItem("items")
        });
  }
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                  placeholder="name@example.com"
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" onClick={(e) => submitLogin(e)} >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
