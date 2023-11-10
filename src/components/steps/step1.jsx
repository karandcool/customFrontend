
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import validator from "validator";
import "./step1.css"
import { useEffect } from "react";
// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ items, nextStep, handleFormData, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(items?.length > 0) {
      setLoading(false)
    }
  },[])


  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values.imageSelected)
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };

  return (
    <div>
      {!loading && 
      <>
      <div align="center" style={{" color":"white"}}>
    <h1 style={{"font-family":"Berlin Sans FB", "color":"rgb(158, 0, 226)"}}>
      <strong> Select Item To Customise </strong>
     
    </h1>
    {
      error &&
      <p style={{"color": "red"}}>Please Select One Of them To Proceed</p>

    }
    <div>
    {items.map((product) => {
      
          return (
            
            <>
              <input onClick={handleFormData("imageSelected")} type="radio" id={product?._id} name="item" class="Send_data  input-hidden" value={product?._id} />
      <label for={product?._id}>
              {/* <input type="radio" id={product?.id} name="item" className="Send_data  input-hidden" value={product?.name} />
              <label for={product?.name}> */}
              <img src={`https://customxpert.onrender.com/${product?.picture[0]}`} style={{ "width": "130px", "border-radius": "20px;" }} />
              <br />
              <span>{product?.name}</span>
            </label>
            </>
            
          )
    })}

    </div>
       
    
  </div>
  <div style={{float: "right", "marginTop": "10%"}}>
  <Button style={{border: "none", backgroundColor: "rgb(158, 0, 226)"}} onClick={submitFormData}>
              Continue
            </Button>

  </div>
      </>
      
}

  {loading &&
           <div id="loader" style={{"color":"rgb(157, 255, 0)"}}>
                </div>

       }
  

      

    </div>
  );
};

export default StepOne;