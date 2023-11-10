import { useState } from "react";
import { Footer, Navbar } from "../components";
// import 'react-button/style/react-button.css';
import { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Orders =  () => {
   useEffect(() => {
    getAllOrders()
   },[])

   const [allOrders, setAllOrders] = useState()
   const [selectedOrder, setSelectedOrders] = useState([])
   const [loading, setLoading] = useState(true)
   const getAllOrders = () => {
    const getToken = JSON.parse(localStorage.getItem('token'))
    fetch("https://customxpert.onrender.com/api/order", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
                      'token': `Bearer ${getToken?.token}`        
          },
        })
        .then(res => res.json())
        .then((post) => {
            setAllOrders(post)
            setSelectedOrders(post)
            (post)
            setLoading(false)   
        });
   }
    const getOrders = async (type) => {
        if(type === 'All') { 
           await setSelectedOrders(allOrders)
        } else{
           
            const newData =  await allOrders.filter((element, index) => element.orderStatus == type)
           
            setSelectedOrders(newData)
        }
        
    }
    return(
        <>
        <Navbar />
        <div style={{marginTop: '10px',textAlign: 'center' , marginBottom: '20px'}}>
            <div style={{   textAlign: 'center' , marginBottom: '20px'}}>
            <button style={{   border: 'none', color:"rgb(158, 0, 226)", background: 'none'}} onClick={ () => getOrders('All')}>All Orders</button>
      <button style={{   border: 'none', color:"rgb(158, 0, 226)", background: 'none'}} onClick={ () => getOrders('Delievered')}>Delivered</button>
      <button style={{   border: 'none', color:"rgb(158, 0, 226)", background: 'none'}} onClick={ () =>getOrders('Pending')}>Pending</button>
      <button style={{   border: 'none', color:"rgb(158, 0, 226)", background: 'none'}} onClick={ () => getOrders('Failed')}>Failed</button>
            </div>
      <div className="container-fluid">
        {selectedOrder?.length > 0 &&
      <Table>
      <Thead>
        <Tr>
          <Th>Order Id</Th>
          <Th>Items</Th>
          <Th>Total Items</Th>
          <Th>Total Price</Th>
          <Th>Payment Status</Th>
          <Th>Order Status</Th>


        </Tr>
      </Thead>
      <Tbody>
      {selectedOrder?.length > 0 && selectedOrder.map((item, index) => {
        return(
          <Tr>
          
          <Td>{item?._id}</Td>
          <Td>
            {item?.items.map((data, index) => {
              return(
                <img style={{width:'25px', height:"30px"}} src={data.finalcustomiseImage ? `https://customxpert.onrender.com/${data?.finalcustomiseImage}` : `https://customxpert.onrender.com/${data?.picture[0]}` } />

              )
            })}
           

          </Td>
          <Td>{item?.totalItems}</Td>
          <Td>{item?.totalPrice}</Td>
          <Td>{item?.paymentStatus}</Td>
          <Td>{item?.orderStatus}</Td>
        </Tr>

        )
      })}
        
      </Tbody>
    </Table>
}{selectedOrder.length == 0 &&
  <h2>No Orders</h2>
}
      </div>
        </div>
       

    
    
   
    
  {/* <Footer /> */}
        </>
        
    )
}

export default Orders