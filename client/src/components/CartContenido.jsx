import "./css/Cart.css";

import { useId } from "react";
import { CartIconBig, ClearCartIcon } from "./Icons.jsx";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../hooks/useCart.js";
import ColorBadge from "./ColorBadge.jsx";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


import useValidacion from "../hooks/useValidacion.jsx";




function CartItem({
  thumbnail,
  price,
  title,
  quantity,
  addToCart,
  removeFromCart,
  restToCart,
}) {
  return (
    <li>
      <div className="kartimgtitle">
        <img
          src={thumbnail}
          alt={title}
          style={{
            borderRadius: "10px",
            width: "90px",
            height: "90px",
          }}
        />

        <div className="karttitle">
          <strong
            style={{
              fontSize: "17px",
              lineHeight: "1.125",
              fontWeight: 600,
              letterSpacing: ".004em",
              fontFamily:
                '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
              color: "black",
              marginBottom: "0px", // Añadir margen inferior al h2 para separarlo del siguiente elemento
            }}
          >
            {title}
          </strong>
          <strong
            style={{
              fontSize: "17px",
              lineHeight: "1.125",
              fontWeight: 600,
              letterSpacing: ".004em",
              fontFamily:
                '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
              color: "black",
              marginBottom: "0px", // Añadir margen inferior al h2 para separarlo del siguiente elemento
            }}
          >
            $ {price}
          </strong>
        </div>
      </div>

      <div className="footerCart">
        <button
          onClick={removeFromCart}
          style={{
            backgroundColor: "#B65A47",
            border: "none",
            padding: "5px",
            marginRight: "30px",
          }}
        >
          <DeleteIcon />
        </button>

        <div
          style={{ display: "flex", flexDirection: "row", maxWidth: "90px" }}
        >
          <button
            onClick={addToCart}
            style={{
              backgroundColor: "#ababab",
              marginRight: 0,
              marginLeft: 0,
              borderRadius: "5px 0px 0px 5px",
              height: "35px",
              padding: "8px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6666 6.88905H9.11103V1.3335H6.88881V6.88905H1.33325V9.11127H6.88881V14.6668H9.11103V9.11127H14.6666V6.88905Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>

          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            style={{
              width: "40px",
              textAlign: "center",
              margin: "0 0px",
              maxWidth: "40px",
              marginBottom: "5px",
              maxHeight: "35px",
              background: "white",
              color: "black",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              borderRadius: "0",
            }}
            className="inputCart"
          />

          <button
            onClick={quantity < 2 ? removeFromCart : restToCart}
            style={{
              backgroundColor: "#ababab",
              marginRight: 0,
              marginLeft: 0,
              borderRadius: "0px 5px 5px 0px",
              height: "35px",
              padding: "8px",
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.333 9.334h13.334V7.11H1.333v2.223z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <br></br>
      <br></br>
    </li>
  );
}










export function CartContenido() {


    const { handlecarritoappear } = useValidacion();

    const { opennn } = useValidacion();




  const { cart, clearCart, addToCart, removeFromCart, restToCart } = useCart();

  

  const total = cart;

  const totalProductos = cart.reduce(
    (total, producto) => total + producto.quantity,
    0
  );

  const precioTotal = cart.reduce(
    (total, producto) => total + producto.price * producto.quantity,
    0
  );

  console.log(totalProductos);

  const precioTot = parseFloat(precioTotal.toFixed(2));

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    // Redirige al usuario a la página de carrito

    navigate("/carrito");
  };

  return (

    <>


{/* TENEMOS 2 ASIDES  */ }

      
      <aside className="cart" style={{ display:"block"}}>

        <label
          className="cart-cierre-button"
          style={{ marginLeft: "-60px" }}
          
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <svg
              class="vtex__icon-close  "
              width="26"
              height="26"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="#000"
            >
              <g fill="#000">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </g>
            </svg>
          </div>
        </label>

        {total != 0 && (
          <div
            className="clearButtonClass"
            style={{ marginLeft: "-40px", display: "flex" }}
          >
            <button
              onClick={clearCart}
              style={{
                background: "white",
                border: "none",
                padding: "5px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  stroke="#000"
                  d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                ></path>
                <path stroke="#000" d="M17 17a2 2 0 1 0 2 2"></path>
                <path stroke="#000" d="M17 17h-11v-11"></path>
                <path
                  stroke="#000"
                  d="M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7"
                ></path>
                <path stroke="#000" d="M3 3l18 18"></path>
              </svg>
            </button>
          </div>
        )}
      </aside>




      <aside

        className="cart"
        style={{ marginTop: "80px", display:"block"}}
      >
        {total == 0 && (
          <label className="labelCart">
            <div
              style={{
                display: "flex",
                justifyContent: "center", // Centra horizontalmente
                alignItems: "center", // Centra verticalmente
                flexDirection: "column",
                backgroundColor: "#faf9ff",
                border: "none",
                padding: "10px",
                borderRadius: "15px",
                fontWeight: "bold",
                height: "500px",
                width: "500",
                margin: "30px",
              }}
            >
              <CartIconBig />

              <p
                style={{
                  color: "black",
                  fontSize: "20px",
                  lineHeight: 1.1428571429,
                  fontWeight: 600,
                  letterSpacing: ".007em",
                  fontFamily:
                    "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Carrito vacío.
              </p>
            </div>
          </label>
        )}

        <div
          className="componenteconsrollbar"
          style={{
            maxHeight: "400px",
            overflowY: cart.length > 0 ? "auto" : "hidden",
            overflowX: "hidden",
            marginLeft: "-30px",
            backgroundColor: "#fffdfd",
          }}
        >
          <ul
            style={{
              paddingRight: cart.length > 0 ? "50px" : "0px", // ajusta el espaciado derecho solo si hay elementos en el carrito
              paddingTop: "10px",
              backgroundColor: "#faf9ff",
            }}
          >
            {cart.map((product) => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                removeFromCart={() => removeFromCart(product)}
                restToCart={() => restToCart(product)}
                {...product}
              />
            ))}
          </ul>
        </div>

        {totalProductos !== 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Centra horizontalmente
              textAlign: "center", // Centra el texto horizontalmente
              marginTop: "50px",
              color: "black",
            }}
          >
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.125",
                fontWeight: 600,
                letterSpacing: ".004em",
                fontFamily:
                  '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                color: "black",
                marginBottom: "10px", // Añadir margen inferior al h2 para separarlo del siguiente elemento
                marginRight: "30px",
              }}
            >
              Total $ {precioTot}
            </p>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.125",
                fontWeight: 600,
                letterSpacing: ".004em",
                fontFamily:
                  '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                color: "black",
                marginBottom: "0px", // Añadir margen inferior al h2 para separarlo del siguiente elemento
                marginRight: "30px",
              }}
            >
              Incluye envío y tasas
            </p>

            <button
              style={{
                background: "#244e83",
                width: "230px",
                height: "50px",
                fontSize: "17px",
                lineHeight: "1.125",
                fontWeight: 600,
                letterSpacing: ".004em",
                fontFamily:
                  '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                color: "white",
                marginBottom: "0px", // Añadir margen inferior al h2 para separarlo del siguiente elemento
                borderRadius: "30px",
                marginTop: "10px",
                marginRight: "40px",
              }}
              onClick={() => {
                handleCheckoutClick();
                handlecarritoappear();
              }}
            >
              Ir al Checkout
            </button>
          </div>
        )}


      </aside>







    </>
  );
}
