import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./css/checkoutForm.css";
import { useCart } from "../hooks/useCart.js";
import useValidacion from "../hooks/useValidacion.jsx";
import { WhatsApp } from "@mui/icons-material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";


import "./css/fonts/fonts5144.css"; // importar fuente de apple
import "./css/Mostrador.css"; // Importar estilos boton de apple


import { useNavigate } from "react-router-dom";



const CheckoutForm = () => {



  const navigate = useNavigate();


  const { invisibilizarbotoncarrito, handleinvisibilizarcarrito} = useValidacion();


  const [random, setrandom] = useState(null);


  const enlacePagoRef = useRef(null);
  const { alterarValidacion } = useValidacion();
  const { alterarRandom } = useValidacion();
  const { cart, clearCart } = useCart();

  const [showDiv, setShowDiv] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [serverResponseReceived, setServerResponseReceived] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [showShippingButton, setShowShippingButton] = useState(false);
  const [showCentrado, setShowCentrado] = useState(false);









  const enviarMensajeWhatsapp = () => {

    const carrito = cart;
    
    
    let mensaje = `Buenos días, mi número de pedido es ${random} y quisiera adquirir los siguientes productos:\n`;
  
    carrito.forEach(producto => {


      mensaje += `${producto.quantity}\n`; 
      mensaje += `${producto.title}\n`; // Añadir el título del producto al mensaje
  
      // Verificar y añadir detalles adicionales si existen
      if (producto.color) {
        mensaje += `Color: ${producto.color}\n`;
      }
      if (producto.pulgadas) {
        mensaje += `Pulgadas: ${producto.pulgadas}\n`;
      }
      if (producto.memoria) {
        mensaje += `Memoria: ${producto.memoria}\n`;
      }
      if (producto.ram) {
        mensaje += `RAM: ${producto.ram}\n`;
      }
      if (producto.procesador) {
        mensaje += `Procesador: ${producto.procesador}\n`;
      }
      if (producto.price) {
        mensaje += `Precio: ${producto.price} USD\n`;
      }
  
      mensaje += '\n'; // Separador entre productos
    });
  
    const numeroTelefono = import.meta.env.VITE_NUMERO_TELEFONO;
    const enlaceWhatsapp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(enlaceWhatsapp, "_blank");



  };
  







  const handlePagar = () => {
    if (enlacePagoRef.current) {
      enlacePagoRef.current.scrollIntoView({ behavior: "smooth" });
    }
    alert(`Deposita a Banco Pichincha cuenta 2224244`);
  };

  const handlepedido = () => {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
      console.log(
        "La propiedad 'cart' se eliminó correctamente del almacenamiento local."
      );
    } else {
      console.log("La propiedad 'cart' no existe en el almacenamiento local.");
    }

    // Verificar si se recibió la respuesta del servidor
    if (serverResponseReceived && responseMessage) {
      alterarValidacion();
      setShowCentrado(true);
    }
  };


  
  const handleSubmit = async (event) => {


    alterarValidacion()

    event.preventDefault();

    localStorage.removeItem("cart");

    const formData = new FormData(event.target);
    
    const requestData = Object.fromEntries(formData.entries());






    const cartData = cart.map((item) => ({


      title: item.title,
      price: item.price,
      quantity: item.quantity,
      pulgadas: item.pulgadas,
      color: item.color,
      almacenamiento: item.memoria,
      ram: item.ram,
      procesador: item.procesador


    }));



    for (const item of cartData) {
      console.log("Title:", item.title);
      console.log("Price:", item.price);
      console.log("Quantity:", item.quantity);
      console.log("Pulgadas:", item.pulgadas);
      console.log("Color:", item.color);
      console.log("Almacenamiento:", item.almacenamiento);
      console.log("RAM:", item.ram);
      console.log("Procesador:", item.procesador);
      console.log("------------------------");
    }




    try {


      const dataToSend = { ...requestData, cart: cartData };


      console.log("Request antes de enviar:", dataToSend);


      const baseURL = import.meta.env.VITE_API_BASE_URL;



      const response = await axios.post(
        `${baseURL}/api/registroporcedula`,
        dataToSend
      );
      




      handleinvisibilizarcarrito(false);

      setResponseMessage(response.data.message);

      const randomm = response.data.random;

      alterarRandom(randomm);
      setrandom(randomm);


      if (response.data.success) {



        


        setShowSuccessMessage(true);
        setShowShippingButton(true);
        setShowDiv(true);


        if (enlacePagoRef.current) {
          enlacePagoRef.current.scrollIntoView({ behavior: "smooth" });
        }

        // Marcar que se recibió la respuesta del servidor
        setServerResponseReceived(true);
      }
    } catch (error) {
      setResponseMessage("Error: No se pudo enviar el formulario");
      console.error("Error al enviar el formulario:", error);
    } finally {
      setButtonVisible(false);

    /* clearCart();*/

    }
  };

  useEffect(() => {
    if (showDiv) {
      console.log("Se recibió la respuesta del servidor");
    }
  }, [showDiv]);

  useEffect(() => {
    if (showDiv && enlacePagoRef.current) {
      enlacePagoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showDiv]);






  return (
    <div className="checkoutFormm">
      <div>
        <h3
          className="form-title"
          style={{ display: showCentrado ? "block" : "none" }}
        >
          Datos de envío (no registrado) <LocalShippingIcon />
        </h3>
        <div
          className="centrado"
          style={{ display: showCentrado ? "block" : "none" }}
        ></div>
        <form
          className="form223"
          onSubmit={handleSubmit}
          style={{ display: buttonVisible ? "block" : "none" }}
        >
          <div className="form-group">
            <label htmlFor="nombre"   style={{
              fontSize: "16px",
             lineHeight: "1.21053",
             fontWeight: 450,
             letterSpacing: "0em",
             fontFamily:
               '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
             
           }}>Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              style={{ borderRadius: "30px", height: '35px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellidos"     
            
            style={{
               fontSize: "16px",
              lineHeight: "1.21053",
              fontWeight: 450,
              letterSpacing: "0em",
              fontFamily:
                '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
              
            }}>Apellidos:</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              required
              style={{ borderRadius: "30px", height: '35px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccion" style={{
              fontSize: "16px",
             lineHeight: "1.21053",
             fontWeight: 450,
             letterSpacing: "0em",
             fontFamily:
               '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
             
           }}>Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              required
              style={{ borderRadius: "30px", height: '35px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ciudad" style={{
              fontSize: "16px",
             lineHeight: "1.21053",
             fontWeight: 450,
             letterSpacing: "0em",
             fontFamily:
               '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
             
           }}>Ciudad:</label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              required
              style={{ borderRadius: "30px", height: '35px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="codigopostal" style={{
              fontSize: "16px",
             lineHeight: "1.21053",
             fontWeight: 450,
             letterSpacing: "0em",
             fontFamily:
               '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
             
           }}>Código postal:</label>
            <input
              type="text"
              id="codigopostal"
              name="codigopostal"
              required
              style={{ borderRadius: "30px", height: '35px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="celular" style={{
              fontSize: "16px",
             lineHeight: "1.21053",
             fontWeight: 450,
             letterSpacing: "0em",
             fontFamily:
               '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
             
           }}>Celular:</label>
            <input
              type="text"
              id="celular"
              name="celular"
              required
              style={{ borderRadius: "30px", height: '35px' }}
            />
          </div>


          <div className="form-group">
            <label htmlFor="email" style={{
              fontSize: "16px",
             lineHeight: "1.21053",
             fontWeight: 450,
             letterSpacing: "0em",
             fontFamily:
               '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
             
           }}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              style={{ borderRadius: "30px", height: '35px' }}
            />
          </div>



          <div className="form-group">
          <label htmlFor="cedula" style={{
            fontSize: "16px",
           lineHeight: "1.21053",
           fontWeight: 450,
           letterSpacing: "0em",
           fontFamily:
             '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
           
         }}>Cedula para rastrear pedido:</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            required
            style={{ borderRadius: "30px", height: '35px' }}
          />
        </div>




     



          <div className="realizarpedidoboton">
            <button
              type="submit"
              style={{
                display: buttonVisible ? "block" : "none",
                borderRadius: "30px",
                background: "#0071e3",
                color: "white",
                marginTop: "50px",
              }}
            >
               Completar Pedido
            </button>
          </div>


        </form>




  


















        {responseMessage && (



          <div className="response-message-container">
            
            <div
              className="totaltotal"
              style={{
                borderRadius: "10px",
                padding: "10px",
                marginTop: "20px",
                display: "flex",
                gap: "5px",
                fontSize: "19px",
                lineHeight: "1.21053",
                fontWeight: 400,
                letterSpacing: "0em",
                fontFamily:
                  '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                  flexDirection:"column",
              }}
            >
              

              <div className="response-message" style={{marginTop:"30px", fontSize:"15px"}}>{responseMessage}</div>

              <button
                style={{
                  background: "green",
                  color: "white",
                  marginTop: "45px",
                }}
                onClick={enviarMensajeWhatsapp}
               
              >
                Pago WhatsApp <WhatsApp />
              </button>


            </div>




          
      
          </div>


          
        )}



























      </div>
    </div>
  );
};

export default CheckoutForm;
