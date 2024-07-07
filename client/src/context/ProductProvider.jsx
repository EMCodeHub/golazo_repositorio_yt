import { createContext, useContext, useState } from "react";
import {
  getProductscrudRequest,
  deleteProductcrudRequest,
  createProductcrudRequest,
  getProductcrudRequest,
  updateProductcrudRequest,
 
} from "./products.api";
import { ProductContext } from "./ProductContext";



export const useProducts = () => {

  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductContextProvider");
  }
  return context;
};




export const ProductContextProvider = ({ children }) => {


  const [products, setProducts] = useState([]);



  async function loadProducts() {
    const response = await getProductscrudRequest();
    setProducts(response.data);
  }




  const deleteProduct = async (id) => {
    try {
      const response = await deleteProductcrudRequest(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };




  
  const createProduct = async (product) => {
    try {
      await createProductcrudRequest(product);
      
    } catch (error) {
      console.error(error);
    }
  };






  const getProduct = async (id) => {
    try {
      const response = await getProductcrudRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };





  const updateProduct = async (id, newFields) => {
    try {
      const response = await updateProductcrudRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };












  return (
    <ProductContext.Provider
      value={{
        products,
        loadProducts,
        deleteProduct,
        createProduct,
        getProduct,
        updateProduct,
       
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
