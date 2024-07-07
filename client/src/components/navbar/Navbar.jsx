import { useState } from "react";



import { AppBar, Button, Drawer, IconButton, Toolbar } from "@mui/material";


import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";

import "../css/NavbarBuscador.css";


import NavListDrawer from "./NavListDrawer";



import {
  BuscadorIconHome,
  Basketshop,
  Menulineasdos,
  LogoGolazoo,
  BolsaCarritoEstilizada,
} from "../svgNavbar";

import useValidacion from "../../hooks/useValidacion";

import { useLocation } from "react-router-dom";

import ColorBadge from "../ColorBadge.jsx";

import { Cart } from "../Cart.jsx";

import { useCart } from "../../hooks/useCart.js";




function Navbar({ navArrayLinks }) {

  const { cart } = useCart();

  const totalProductos = cart.reduce(
    (total, producto) => total + producto.quantity,
    0
  );

  const location = useLocation();

  const isShopOrCartRoute =
 
    location.pathname === "/carrito" ||
    location.pathname === "/login" ||
    location.pathname === "/contacto" ||
    location.pathname === "/register" ||
    location.pathname === "/legal" ||
    location.pathname === "/sobrenosotros" ||
    location.pathname === "/descriptionhome" ||
    location.pathname === "/description"||
    location.pathname === "/rastrear";


  const navigate = useNavigate();

  const { handledivappear, handlecarritoappear, handleopendrawer } =
    useValidacion();

  const { opennn, OpenDrawer } = useValidacion();

  const navigatecarrito = () => {
    navigate("/carrito");
  };



  return (
    <>
      <AppBar
        position="fixed"
        x={{ margin: "0", padding: "0", maxHeight: "10px" }}
      >
        <Toolbar sx={{ margin: "0", padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(22, 22, 23)",
              padding: "0",
              marginTop: "-10px",
              marginLeft: "30px",
            }}
            onClick={() => navigate("/")}
          >



<img src="http://www.elgolazo.net/imagenesvarias/golazologofin.png" onClick={() => navigate("/")} width={26} height={26} />



         {   /*<LogoGolazoo onClick={() => navigate("/")} />
          */}


          </div>
          <div style={{ flex: 1 }} />

          <div className="letrasbuscadorw">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                marginRight: "30px",
                marginTop: "-15px",
              }}
            >


            
       



              <div
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  backgroundColor: "rgba(22, 22, 23)",
                  color: "white",
                  borderRadius: "4px",
                  lineHeight: "1.1428571429",
                  fontSize:'14px',
                  fontWeight: 500,
                  letterSpacing: ".007em",
                  fontFamily:
                    "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
                onClick={() => navigate("/shop")}
              >
                Tienda
              </div>



              {/* Otras opciones de menú */}
              <div
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  backgroundColor: "rgba(22, 22, 23)",
                  color: "white",
                  borderRadius: "4px",
                  lineHeight: "1.1428571429",
                  fontSize:'14px',
                  fontWeight: 500,
                  letterSpacing: ".007em",
                  fontFamily:
                    "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
                onClick={() =>
                  navigate("/shop", { state: { category: "Smartphones" } })
                }
              >
                Celulares
              </div>
              <div
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  backgroundColor: "rgba(22, 22, 23)",
                  color: "white",
                  borderRadius: "4px",
                  lineHeight: "1.1428571429",
                  fontSize:'14px',
                  fontWeight: 500,
                  letterSpacing: ".007em",
                  fontFamily:
                    "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
                onClick={() =>
                  navigate("/shop", { state: { category: "Laptops" } })
                }
              >
                Laptops
              </div>
              <div
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  backgroundColor: "rgba(22, 22, 23)",
                  color: "white",
                  borderRadius: "4px",
                  lineHeight: "1.1428571429",
                  fontSize:'14px',
                  fontWeight: 500,
                  letterSpacing: ".007em",
                  fontFamily:
                    "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
                onClick={() =>
                  navigate("/shop", { state: { category: "Televisores" } })
                }
              >
                Televisores
              </div>


              <div
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  backgroundColor: "rgba(22, 22, 23)",
                  color: "white",
                  borderRadius: "4px",
                  lineHeight: "1.1428571429",
                  fontSize:'14px',
                  fontWeight: 500,
                  letterSpacing: ".007em",
                  fontFamily:
                    "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
                onClick={() =>
                  navigate("/shop", { state: { category: "Videojuegos" } })
                }
              >
                Videojuegos
              </div>


              <div
              style={{
                cursor: "pointer",
                padding: "8px 12px",
                backgroundColor: "rgba(22, 22, 23)",
                color: "white",
                borderRadius: "4px",
                lineHeight: "1.1428571429",
                fontSize:'14px',
                fontWeight: 500,
                letterSpacing: ".007em",
                fontFamily:
                  "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
              onClick={() =>
                navigate("/shop", { state: { category: "Tablets" } })
              }
            >
              Tablets
            </div>

         

        















            <div
            style={{
              cursor: "pointer",
              padding: "8px 12px",
              backgroundColor: "rgba(22, 22, 23)",
              color: "white",
              borderRadius: "4px",
              lineHeight: "1.1428571429",
              fontSize:'14px',
              fontWeight: 500,
              letterSpacing: ".007em",
              fontFamily:
                "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
            onClick={() => navigate("/rastrear")}
          >
            Rastrear pedido
          </div>



          <div
          style={{
            cursor: "pointer",
            padding: "8px 12px",
            backgroundColor: "rgba(22, 22, 23)",
            color: "white",
            borderRadius: "4px",
            lineHeight: "1.1428571429",
            fontSize:'14px',
            fontWeight: 500,
            letterSpacing: ".007em",
            fontFamily:
              "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </div>


        
        <div
        style={{
          cursor: "pointer",
          padding: "8px 12px",
          backgroundColor: "rgba(22, 22, 23)",
          color: "white",
          borderRadius: "4px",
          lineHeight: "1.1428571429",
          fontSize:'14px',
          fontWeight: 500,
          letterSpacing: ".007em",
          fontFamily:
            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
        }}
        onClick={() => navigate("/carrito")}
      >
        Bolsa
      </div>















            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "-15px",
            }}
          >
            {!isShopOrCartRoute && (
              <div
                color="inherit"
                onClick={handledivappear}
                style={{
                  padding: "0",
                  border: "none",
                  minWidth: "unset",
                  width: "50px",
                }}
                className="BotonBuscadoLupa"
              >
                <BuscadorIconHome onClick={handledivappear} />
              </div>
            )}

            <div
              style={{
                padding: "0",
                border: "none",
                marginLeft: "1px",
                minWidth: "unset",
                width: "50px",
              }}
              onClick={handlecarritoappear}
            >
              <ColorBadge cantidad={totalProductos} />
            </div>

            {/*<Cart />*/}

            <div
              onClick={() => handleopendrawer()}
              className="BotonMenutreslineas"
              style={{
                backgroundColor: "rgba(22, 22, 23)",
                padding: "0",
                border: "none",
                marginLeft: "1px",
                marginTop: "7px",
                width: "50px",
              }}
            >
              <Menulineasdos />
            </div>
          </div>
        </Toolbar>
      </AppBar>





      {/* ESTE ES EL DRAWER QUE HAY QUE COPIAR */ }


      <Drawer
        open={OpenDrawer}
        anchor="top"
        onClose={() => handleopendrawer(false)}
        transitionDuration={700}
      >
        <div style={{ backgroundColor: "rgba(22, 22, 23)", height: "3000px" }}>
          <div
            style={{
              marginRight: "40px",
              marginTop: "20px",
              height: "50px",
              display: "flex",
              justifyContent: "flex-end",
            }}
            onClick={() => handleopendrawer(false)}
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

          {/* Contenido del drawer */}
          <NavListDrawer
            navArrayLinks={navArrayLinks}
            navLink={NavLink}
            setOpen={handleopendrawer}
          />
        </div>
      </Drawer>









    </>
  );
}

export default Navbar;
