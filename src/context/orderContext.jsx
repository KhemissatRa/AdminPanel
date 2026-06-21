// src/context/OrderContext.js
import axios from "axios";
import { createContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
const token=localStorage.getItem('token')
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) throw new Error("No token found — please log in first.");
        const res = await axios.get("https://backendoctoweb-1.onrender.com/order/",    
        {  headers: { "x-auth-token": token }} // ✅ lowercase headers
        )          

        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
const Delete=async(id)=>{
  try{
  await axios.delete(`https://backendoctoweb-1.onrender.com/${id}`,   {
          headers: { "x-auth-token": token }, // ✅ lowercase headers
        })
  
  const filterd=orders.filter((item)=>item._id !== id);
  setOrders(filterd)

}catch(err)
{
  console.log(err)
}
}
const updt = async (id) => {
  try {
    await axios.put(`https://backendoctoweb-1.onrender.com/${id}`, { Done: true },   {
          headers: { "x-auth-token": token }, // ✅ lowercase headers
        });

    // Update local state immutably
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, Done: true } : order
      )
    );
  } catch (err) {
    console.error(err);
  }
};
  return (
    <OrderContext.Provider value={{ updt,orders, setOrders, Delete}}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
