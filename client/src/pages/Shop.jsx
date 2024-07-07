import ShopApp from "../components/ShopApp";

//import { FiltersProvider } from "../context/filters.jsx";

//import Footer from "../components/footer/Footer.jsx";

import { Footer } from "../components/Footer";

import "../components/css/shop.css";

import { Header } from "../components/Header.jsx";

import { useLocation } from "react-router-dom";

import { useEffect } from "react";

//este es nuestro componente Cart, el cual será la barra lateral derecha, es decir, el div que aparecerá cuando desplegamos la lista de la compra ➡️  estará al lado derecho de nuestra aplicación (div de color blanco)

//import { Cart } from "../components/Cart.jsx";

import CartDrawer from "../components/CartDrawer";

import Buscador from "../components/Buscador";


import useValidacion from "../hooks/useValidacion";

import { AppBar, Button, Drawer, IconButton, Toolbar } from "@mui/material";


function Shop() {


  const location = useLocation();

  const { openn, handledivappear } = useValidacion();
  
  // Obtener la categoría de la ubicación actual
  let category = location.state?.category;

  // Si la categoría no está definida, establecerla en "all"
  if (!category) {
    category = "all";
  }

  useEffect(() => {
    // Smooth scroll hacia el header al cargar el componente
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);



  return (
    <>
      <div>
        <Header category={category} />

        <div className="topgeneral">
          <div className="general">
            <ShopApp />
          </div>



          <CartDrawer/>




          <Drawer
          open={openn}
          anchor="top"
          onClose={handledivappear}
          transitionDuration={700} 
        >
          <div style={{ backgroundColor: "rgba(22, 22, 23)", height:'3000px'}}> {/* Div para el color de fondo negro */}
            
          <div
              style={{
           
                marginRight: "40px",
                marginTop: "20px",
                height:"50px",
                
                display:'flex',
                justifyContent:'flex-end'
                
              }}
              onClick={handledivappear}
            >
              <svg
                class="vtex__icon-close"
                width="26"
                height="26"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#ffff"
              >
                <g fill="#ffff">
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </g>
              </svg>
            </div>
           
    
          {  /*
            <NavListDrawer
              navArrayLinks={navArrayLinks}
              navLink={NavLink}
              setOpen={setOpen}
              
            />*/}
    
            <Buscador />
    
    
          </div>
        </Drawer>
    





















      


          <Footer />
        </div>
      </div>
    </>
  );
}

export default Shop;
