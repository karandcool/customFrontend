import React, {useEffect, useState} from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {

  // const getCategories = async () => {
  //   ("jkwhkdhkshjbcjhbdscjhdbcjhdbcjhc")
  //   const response = await fetch("https://customxpert.onrender.comapi/category");
  //   (response)
  //   const catData = await response.json()
  //   setCategory(catData)
  // };

  
  
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p>In a world that constantly seeks individuality and self-expression, fashion serves as a potent medium for personal statements. At Your Customizable Clothing, we've embraced this desire for uniqueness and self-expression by offering a diverse range of customizable clothing options. With a passion for fashion and a commitment to helping you craft your distinctive style, we're delighted to introduce ourselves and share our journey with you.</p>

        <h2>Our Vision and Values</h2>
        <ul>
            <li><strong>Creativity:</strong> We celebrate the art of self-expression and encourage creative freedom in design.</li>
            <li><strong>Quality:</strong> We're committed to delivering top-notch quality in every garment, ensuring they last for years to come.</li>
            <li><strong>Sustainability:</strong> We are dedicated to sustainable fashion practices, using eco-friendly materials and reducing waste.</li>
            <li><strong>Inclusivity:</strong> Our clothing is designed to cater to all body types, genders, and styles, promoting inclusivity and diversity.</li>
            <li><strong>Customer-Centric:</strong> We prioritize your satisfaction, offering exceptional customer service and a seamless shopping experience.</li>
        </ul>

        <h2>Our Customization Process</h2>
        <p>What sets Your Customizable Clothing apart is our easy and intuitive customization process. We offer a wide array of clothing items, from t-shirts and hoodies to dresses and jackets, all of which can be tailored to suit your unique taste.</p>
        {/* <!-- Add more content about the customization process here --> */}

        <h2>Quality Assurance</h2>
        <p>Quality is our utmost priority. We believe that custom clothing should not only be unique but also built to last. To achieve this, we source the finest materials, employ skilled artisans, and maintain stringent quality control processes at every stage of production. Our commitment to quality means that when you wear Your Customizable Clothing, you're not only making a style statement but also investing in long-lasting fashion.</p>
        {/* <!-- Add more content about quality assurance here --> */}

        <h2>Sustainability Initiatives</h2>
        <p>In an era of increasing environmental consciousness, we're committed to minimizing our ecological footprint. Our sustainability initiatives include:</p>
        <ul>
            <li>Eco-friendly Materials</li>
            <li>Reduced Waste</li>
            <li>Fair Labor Practices</li>
            <li>Recycling and Upcycling</li>
        </ul>
        {/* <!-- Add more content about sustainability initiatives here --> */}

        <h2>Community and Collaboration</h2>
        <p>At Your Customizable Clothing, we understand the power of community. We've cultivated a passionate community of fashion enthusiasts who share their unique creations and inspire others. We also collaborate with independent artists, designers, and influencers to bring you exclusive collections that push the boundaries of creativity and style.</p>
        {/* <!-- Add more content about community and collaboration here --> */}

        <h2>Customer Satisfaction</h2>
        <p>Your satisfaction is our ultimate reward. We take pride in our exceptional customer service team, ready to assist you with any queries or concerns. We value your feedback and continuously strive to enhance your shopping experience.</p>
        

        {/* <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
        
          
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Mens's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Women's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Jewelery</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Electronics</h5>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  )
}

export default AboutPage