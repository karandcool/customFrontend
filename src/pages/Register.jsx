import React from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Register = () => {
    const navigate = useNavigate()
    const [userForm, setUserForm] = useState({fullName: "", email : "", password: "", cPassword: "" })
    useEffect(() => {
        checkToken()
    },[])
    const checkToken = () => {
        if(localStorage.getItem("token")){
            navigate(-1)
        }
    }
    const handleInputChange = (e) => {
        (e.target.name, e.target.value)
        setUserForm({ ...userForm, [e.target.name]: e.target.value})
      }

      const submitData = (e) => {
        e.preventDefault()
        fetch("https://customxpert.onrender.comapi/user", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userForm)
        })
        .then(res => res.json())
        .then((post) => {
            // (post)
          if(post.status == 200) {
            // localStorage.setItem("token", JSON.stringify(post))
            navigate(`/login`, {replace : true})
          }
          else{
            alert("email already exists")
          }
          (post)
        });
      }
    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form>
                            <div className="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    name="fullName"
                                    placeholder="Enter Your Name"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div className="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    name="email"
                                    placeholder="name@example.com"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div className="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div className="form  my-3">
                                <label for="cPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="cPassword"
                                    name="cPassword"
                                    placeholder="Confirm Password"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" onClick={(e) => submitData(e)}  >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register