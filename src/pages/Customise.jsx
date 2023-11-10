
// import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import StepOne from "../components/steps/step1";
import StepTwo from "../components/steps/step2";
import Final from "../components/steps/final";
import { Navbar } from "../components";
import { useEffect } from "react";

function Customise() {
  //state for steps
  const [step, setstep] = useState(1);
  useEffect(() => {
   getCustomiseItems()
  },[])

   const getCustomiseItems = () => {
        fetch("https://customxpert.onrender.com/api/item/getCustomiseItem", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',        
            },
          })
          .then(res => res.json())
          .then((post) => {
            setCustomiseItems(post)
          });
    }

  //state for form data
  const [formData, setFormData] = useState({
    imageSelected: "",
    selectedSize: "",
    selectedColor: "",
    selectedText: ""
  })
  const[customiseItems, setCustomiseItems] = useState()
  const[selectedItem, setSelectedItem] = useState()

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    const getItem = customiseItems.find((item, index) =>
      item?._id == formData?.imageSelected
    )
    setSelectedItem(getItem)
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = input => e => {
    // input value from the form
    const {value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }


// javascript switch case to show different form in each step
  switch (step) {
    
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="App">
          <Navbar />
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                {customiseItems && 
                <StepOne nextStep={nextStep} items={customiseItems} handleFormData={handleInputData} values={formData} />
                }
              </Col>
            </Row>
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="App">
                    <Navbar />
          {/* <Container> */}
            {/* <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin"> */}
                <StepTwo nextStep={nextStep} prevStep={prevStep} selectedItem={selectedItem} handleFormData={handleInputData} values={formData} />
              {/* </Col>
            </Row> */}
          {/* </Container> */}
        </div>
      );
      // Only formData is passed as prop to show the final value at form submit
   
    default:
      return (
        <div className="App">
        </div>
      );
  }
}

export default Customise;