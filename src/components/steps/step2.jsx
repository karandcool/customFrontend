
import React, { useState } from "react";
import { useEffect } from "react";

import { Button } from "react-bootstrap";
import validator from "validator";
import RadioButton from "../radioButton";
import {Rnd} from 'react-rnd'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./step2.css"
import * as htmlToImage from 'html-to-image';
// import { useRef } from "react";
import { useScreenshot } from 'use-react-screenshot'
import { createRef } from "react";
import { useNavigate } from "react-router-dom";
// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, handleFormData, selectedItem, prevStep, values }) => {
   //creating error state for validation
  const navigate = useNavigate()
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)
  const fontSize = [10, 20, 30, 40,50,60,70,80,90,100]
  const fontFamilies = ['Arial, sans-serif',
  'Helvetica, sans-serif',
  'Times New Roman, serif',
  'Georgia, serif',
  'Verdana, sans-serif',
  'Courier New, monospace',
  'Palatino, serif',
  'Garamond, serif',
  'Futura, sans-serif',
  'Century Gothic, sans-serif',
  
 ]
    const [selectedFontfamily, setSelectedFontFamily] = useState('Arial, sans-serif')
  const [selectedFontSize, setSelectedFontSize] = useState(10)
  const [token, setToken] = useState()
  const [customImage, setcustomImage] = useState()
  const [selectedText, setselectedText] = useState()
  const [addCart, setAddCart] = useState(true)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0});
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0});
  const [resizeImage, setResizeImage] = useState({width: 100, height:100})
  const [resizeText, setResizeText] = useState({width: 100, height:100})
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  

  useEffect(() => {
    if(selectedItem) {
      setLoading(false)

    }
    if(localStorage.getItem("token")) {
      setToken(JSON.parse(localStorage.getItem("token")))
    }
    
  },[])

    // after form submit validating the form data using validator
  const submitFormData = async (e) => {
    e.preventDefault();
    if ((validator.isEmpty(values.selectedSize) || validator.isEmpty(values.selectedColor)) && (selectedItem?.allColors.length > 0 && selectedItem.allSizes.length > 0)) {
      setError(true);
      setAddCart(false)
      
    } else {
      
      setAddCart(true)
      toast("Item Added To Cart", {autoClose:2000})
     await htmlToImage.toPng(ref.current)
  .then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    fetch(img.src)
.then(res => res.blob())
.then(blob => {
  const file = new File([blob], 'finalCustomiseImage.png', blob)
  selectedItem['qty'] = 1
      selectedItem['selectedSize'] = values.selectedSize
      selectedItem['selectedColor'] = values.selectedColor
      selectedItem['fontSize'] = selectedFontSize
      selectedItem['fontFamily'] = selectedFontfamily
      if(selectedText) {
        selectedItem['selectedText'] = {name: selectedText, position: textPosition, size: resizeText}

      }
      if(customImage) {
        selectedItem['customImage'] = {image: '', position: imagePosition, size: resizeImage}

      }


      
      addToCart(file)
  
})
    // document.body.appendChild(img);
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
      
     
    }
  };

    const addToCart =  (finalImage) => {
     
      const newData = new FormData()
       newData.append("customImage",customImage )
       newData.append("finalCustomiseImage",finalImage )
       newData.append("itemData", JSON.stringify(selectedItem))
      fetch("https://customxpert.onrender.com/api/cart/addCustomiseItem", {
            method: 'POST',
            headers: {
                        'token': `Bearer ${token?.token}`        
            },
            body:newData
          })
          .then(res => res.json())
          .then((post) => {
            // alert("Item is Added to Cart Api")
            
            setTimeout(() =>{
              navigate('/cart')
            }, 3000)
            
          });
  }
  const handleData = input => e => {
   
    // input value from the form
    const {value } = e.target;
    values[input] = value

    
  }
  return (
    <div className="container-fluid">
   
    {!loading &&
    <>
    {/* <form method="post" encType="multipart/form-data"> */}

    <form>
    <div id={selectedItem?._id} className="step2">
      
            <div ref={ref}  className="imageForCustomise">
            <img
            style={{width:'100%', height: '100%'}}
            // className="imageForCustomise"
            src={`https://customxpert.onrender.com/${selectedItem?.picture[0]}`}
            alt="Card"
            height={300} />
           
  {(customImage !== undefined || selectedText !== undefined) &&
        <div className="uploadData">
        {customImage &&
        <Rnd
        size={{ width: resizeImage.width,  height: resizeImage.height }}
        position={imagePosition}
        onDragStop={(e, d) => { setImagePosition({ x: d.x, y: d.y }) }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setResizeImage({
            width: ref.style.width,
            height: ref.style.height,
            // ...position,
          });
        }}
      >  
            <img
            className="uploadImage"
            src={URL?.createObjectURL(customImage)}
            alt="Card"
            // height={300}
            
            />
           </Rnd> 
            
      }
      {selectedText &&
     
  <Rnd
  size={{ width: resizeText.width,  height: resizeText.height }}
  position={textPosition}
  onDragStop={(e, d) => { setTextPosition({ x: d.x, y: d.y }) }}
  onResizeStop={(e, direction, ref, delta, position) => {
    setResizeText({
      width: ref.style.width,
      height: ref.style.height,
      // ...position,
    });
  }}
>
<p className="uploadText" style={{fontSize: `${selectedFontSize}px`, fontFamily:`${selectedFontfamily}px`}}>{selectedText? selectedText: ""}</p>
     
     </Rnd>
    
            
             
             
}
             
  </div>
}
                        
        
          



            </div>
          
          {(selectedItem?.allColors.length > 0 || selectedItem?.allSizes.length > 0) &&

            <div className="colorDiv">
              <RadioButton values={values} handleData={handleData} allColors={selectedItem?.allColors} availableColors={selectedItem?.availableColor} allSizes={selectedItem?.allSizes} availableSize={selectedItem?.availableSize} />
              {!addCart &&
            <p style={{color: "red"}}>Please Select Your Preference </p>}

            </div>}
            
           
            <div className= {(selectedItem?.allColors.length > 0 || selectedItem?.allSizes.length > 0) ? "selectedThings" : 'placeNew'}>
              <div style={{marginTop: "20px"}}>
              <div className="parent">
            <div className="file-upload">
              <img src={customImage ? URL?.createObjectURL(customImage) : "upload"} alt="upload" />
              <h3>Click box to upload</h3>
              {/* <p>Maximun file size 10mb</p> */}
              <input style={{display: "block"}} type="file" name="customImage" accept="image/*" onChange={(e) => setcustomImage(e.target.files[0])} />
            </div>
          </div>
              {/* <input style={{display: "block"}} type="file" name="customImage" accept="image/*" onChange={(e) => setcustomImage(e.target.files[0])} /> */}
              </div>
              <div style={{marginTop: "20px", display: "flex"}}>
                <div >
                  
                  <div className="parent">
            <div className="file-upload">
              <div>
         
    <p>Select Your Text</p>
              <textarea maxlength ="46" type="text" name="selectedText" onChange={(e) => setselectedText(e.target.value)}/>

    </div>
    <div style={{display: "flex"}}>
      <div>
      <p>Select Size</p>
    <select style={{    alignSelf: 'center',
    'height': 'fit-content'}} onChange={(e) => setSelectedFontSize(e.target.value)}> 
        
      {fontSize.map((size) => <option value={size}>{size}</option>)}
    </select>
      </div>
     <div>
     <p>Select Font</p> 
    <select style={{    alignSelf: 'center',
    'height': 'fit-content'}} onChange={(e) => setSelectedFontFamily(e.target.value)}> 
        
      {fontFamilies.map((font) => <option value={font}>{font}</option>)}
    </select>
     </div>
      
    </div>
    
              {/* <p>Maximun file size 10mb</p> */}
            </div>
          </div>
               
                </div>
            
    
              </div>
            </div>
           

        </div>
        {/* </form> */}
        <div style={{ float: "right", "marginTop": "10%" }}>
            <Button style={{ border: "none", backgroundColor: "rgb(158, 0, 226)" }} onClick={submitFormData}
            >
              Add To Cart
            </Button>

          </div>
          <ToastContainer />
          </form>
          </>

   
    }
      
      {loading &&
           <div id="loader" style={{"color":"rgb(157, 255, 0)"}}>
                </div>

       }
    </div>
  );
};

export default StepTwo;