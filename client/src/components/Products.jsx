import React, { useState, useEffect, useContext } from "react";
import "./css/Products.css";

import "./css/fonts/fonts5144.css"; // traemos la fuente de apple

import "./css/Mostrador.css"; // los estilos del boton de apple





import { AddToCartIcon, RemoveFromCartIcon } from "./Icons.jsx";
import { useCart } from "../hooks/useCart.js";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Alert from "@mui/material/Alert";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useNavigate } from "react-router-dom";
import { FiltersContext } from '../context/filters.jsx'
import { Typography, Rating } from "@mui/material";

export function Products({ products }) {
  const { filters, setFilters } = useContext(FiltersContext)
  const { addToCart, removeFromCart, cart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const productsPerPage = 4;
  const navigate = useNavigate();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, products]); // Update current page when category or products change

  const startIndex = 0; // Start index of products to display
  const endIndex = currentPage * productsPerPage; // End index of products to display

  const visibleProducts = products.slice(startIndex, endIndex); // Slice products array based on current page

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleViewProduct = (product) => {
    
    const productid = product.id;

    navigate(`/description/${productid}`);
  };

  const handleShowMore = () => {
    setCurrentPage(prevPage => prevPage + 1); // Increment current page
  };

  return (
    <>
      {products.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flex: 1,
            fontSize: "20px",
          }}
        >
          <p style={{ color:'black', marginTop: "80px" }}>⚠️ No se encontraron productos</p>
        </div>
      )}




      <section className="products">

        <ul>
          {visibleProducts.map((product) => {
            const isProductInCart = checkProductInCart(product);

            return (
              <li key={product.id}>

              <h4 className="productTitleShop">{product.title}</h4>

                <img src={product.thumbnail} alt={product.title} style = {{width:"50%", margin:"auto"}} />


                <div className="infoproducto">
                 
                  <h3>${product.price}</h3>

                  <div className="valoracion">
                    <Typography component="legend"></Typography>

                    {/*<Rating name="read-only" value={parseInt(product.rating)} readOnly />*/}


                  </div>
                </div>
                <div>



                <div style={{marginBottom:'20px'}}>

                {isProductInCart && (
                      
                  <svg aria-hidden="true" data-testid="SuccessOutlinedIcon" viewBox="0 0 24 24" width='25' height='25'>
                  <path d="M20 12a8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8c.76 0 1.5.11 2.2.31l1.57-1.57A9.822 9.822 0 0 0 12 2 10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10M7.91 10.08 6.5 11.5 11 16 21 6l-1.41-1.42L11 13.17l-3.09-3.09Z" fill="green"/>
                </svg>
                  
                )}



                {!isProductInCart && (
                      
                  <div style={{height:'30px'}}></div>
                  
                )}










                </div>








                  <div style={{ display: "flex", justifyContent: "center", marginBottom:"30px"}}>








                 
                  <button
                  className="buttonApple2"
                  style={{ padding: "5px", height: "40px" }}
                  onClick={() => handleViewProduct(product)}

                >
                  Ver más
                </button>



               


                  </div>
               
                </div>
              </li>
            );
          })}
        </ul>



      </section>







      {currentPage < totalPages && (
        <div
          style={{
            width: "100%",
            backgroundColor: 'rgb(246 246 255)',
            padding: "10px 0",
            zIndex: "100",
            minHeight: "60px",
            boxShadow: "0px -2px 5px rgb(0 0 0 / 50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10pc",
            marginBottom: "100px",
          }}
        >
          <button
            onClick={handleShowMore}
            style={{
              background: '#2a68b1',
              color: 'white',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background-color 0.3s',
              fontSize: '17px',
              fontWeight: 400,
              letterSpacing: '.004em',
              fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
            }}
          >
            Mostrar más
          </button>
        </div>
      )}
    </>
  );
}
