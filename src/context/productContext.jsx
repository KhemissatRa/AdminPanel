// src/context/OrderContext.js
import axios from "axios";
import { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProdctProvider = ({ children }) => {
  const [products, setproducts] = useState([]);
const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://backendoctoweb-1.onrender.com/product/",   {
          headers: { "x-auth-token": token }, // ✅ lowercase headers
        });
        setproducts(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
const Delete=async(id)=>{
  try{
  await axios.delete(`https://backendoctoweb-1.onrender.com/product/${id}`,   {
          headers: { "x-auth-token": token }, // ✅ lowercase headers
        })
  
  const filterd=products.filter((item)=>item._id !== id,   {
          headers: { "x-auth-token": token }, // ✅ lowercase headers
        });
  setproducts(filterd)

}catch(err)
{
  console.log(err)
}
}


  return (
    <ProductContext.Provider value={{ products,setproducts,  Delete}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
