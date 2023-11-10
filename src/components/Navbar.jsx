import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Navbar = () => {
    const navigate = useNavigate()
    // const [state, setState] = useState();
    
    // const getCartData = (getToken) => {
    //     fetch("https://customxpert.onrender.comapi/cart", {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json',
    //                     'token': `Bearer ${getToken?.token}`        
    //         },
    //       })
    //       .then(res => res.json())
    //       .then((post) => {
    //           localStorage.removeItem("items")
    //           setItemsInCart(post)
    //           // setState(post?.items)
    //         (post)
    //       });
    // }
    // const setItemsInCart = (data) => {
    //     const newArray = []
    //     data?.items?.map((item) => {
          
    //       newArray.push({ ...item.item, qty: item.qty } )
    //     })
    //     setState(newArray)
    //     (newArray)
    //   }
    const checkLogin = localStorage.getItem("token")
    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" style={{color:"rgb(158, 0, 226)"}} to="/"> CustomXpert</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/categories">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={ checkLogin ? "/design-customise" : "/login" }>Create New</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li> */}
                        {checkLogin &&
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/orders">Orders</NavLink>
                    </li>
                        }
                        
                    </ul>
                    <div className="buttons text-center">
                    {!checkLogin && 
                    <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i>Login </NavLink>
                     }
                     {checkLogin &&
                                           <button onClick={logout} className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i>Logout </button>

                     }
                        {/* <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink> */}
                        <button onClick={() => navigate("/cart")} className=" btn btn-outline-dark m-2" style={{"background":"none", "border": "none"}}><i style={{"font-size":"30px"}} class="fa">&#xf07a;</i>
                        {/* <div style={{    height: '10px',width: '10px',background: 'red',borderRadius: '10px',float: 'inline-end'}}></div> */}
                        </button>
                        
                        {/* <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> </NavLink> */}
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar