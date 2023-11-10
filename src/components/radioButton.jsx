import { useState } from "react"
import "./radioButton.css"
import { useDebugValue } from "react"
import { useEffect } from "react"
const RadioButton = ({allColors, values, handleData, availableColors, allSizes, availableSize}) => {
    console.log(allColors)
    console.log(availableColors)
    const [color, setSelectedColor]  = useState()
    const [size, setSelectedSize]  = useState()



    const onClickHandle = (data, selected) => {
        console.log(data)
        if(selected == 'selectedSize'){
            setSelectedSize(data)
        } else{
            setSelectedColor(data)
        }

    }
    
return(
    <div className="radioDiv">
 {allColors.length > 0 && <p>Select Your Color : {color}</p> }
    {allColors.length > 0 && allColors.map((data, index) => {
        console.log(data)
        return(
            <label class={data}  onClick={() => onClickHandle(data, "selectedColor")}>
        <input type="radio" name="color" value={data} onClick={handleData("selectedColor")}/>
        <div class="layer"></div>
        <div class="button">
            <span style={{
            background : `${data}`,
          }}  >
            </span></div>
      </label>
        )
        
    })}
 {allSizes.length > 0 && <p>Select Your Size : {size }</p> }
{allSizes.length > 0 && allSizes.map((data, index) => {
        console.log(data)
        return(
            <label class={data} onClick={() => onClickHandle(data, "selectedSize")}  >
        <input type="radio" name="size" value={data} onClick={handleData("selectedSize")}/>
        <div class="layer"></div>
        <div class="sizeRadio">
            <span > {data}
            </span></div>
      </label>
        )
        
    })}

    </div>
)
}

export default RadioButton;