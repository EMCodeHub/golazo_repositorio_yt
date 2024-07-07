// estilos generales del componente

import "./css/CarrouselStylesHome.css";

// el item son (estilos) tambien.

import Item from "./item"; // estos estilos son importantes, son el elemento individual (producto individual)

//importamos el componente del Carousel, previamente habrá que instalar npm i react-elastic-carousel

import Carousel from "react-elastic-carousel";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

//importamos 2 elementos (typography y Rating)
//En rating son las 5 estrellas de valoración

import { Typography, Rating } from "@mui/material";

import "./css/fonts/fonts5144.css"; // traemos la fuente de apple

import "./css/Mostrador.css"; // los estilos del boton de apple


import { useCart } from "../hooks/useCart.js";

//Con los breakPonts, definimos para cada ancho (width, cuantos items tenemos)

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 700, itemsToShow: 3 },
  { width: 900, itemsToShow: 4 },
  { width: 1200, itemsToShow: 5 },
  { width: 1550, itemsToShow: 6 },
  { width: 1700, itemsToShow: 7 },
];

export default function CarrouselHomeCelulares() {



  const { addToCart, removeFromCart, cart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };



  
  const enviarMensajeWhatsApp = async (product) => {
    try {
      // Dato a enviar
      const dato = { title: product.title };

      const baseURL = import.meta.env.VITE_API_BASE_URL;

      // Llamada POST utilizando Axios
      await axios.post(`${baseURL}/api/pedidossinregistro`, dato);

      // Número de teléfono
      const numeroTelefono = import.meta.env.VITE_NUMERO_TELEFONO;

      // Mensaje que se enviará
      const mensaje = `Buenos días, quiero comprar ${product.title}`;

      // Crear el enlace de WhatsApp con el número de teléfono y el mensaje
      const url =
        "https://wa.me/" +
        numeroTelefono +
        "?text=" +
        encodeURIComponent(mensaje);

      // Redirigir al usuario al enlace de WhatsApp creado
      window.location.href = url;
    } catch (error) {
      console.error("Error al enviar el mensaje a través de WhatsApp:", error);
    }
  };

  //navigate para poder navegar entre páginas o componentes
  const navigate = useNavigate();

  // esta función nos hace un navigate a la página de presentación del producto (inividual)
  // pasamos el producto por parámetro




  const handleViewProduct = (product) => {


    const productid = product.id;

    navigate(`/descriptionhome/${productid}`);

    

  };



  //estado para almacenar los productos obtenidos de la api

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(
          `${baseURL}/api/showsmartphonesCarousel`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);



  return (


    <div className="Aplicacion-Carousel">

      <Carousel
        breakPoints={breakPoints}
        pagination={false}
        className="custom-carousel"
        style={{
          backgroundColor: "rgb(255 255 255)", // Establece el color de fondo en negro
        }}
      >
       
      
      
      {products.map((product) => (

          
       

          <Item key={product.id} className="idemCard"   style={{
            backgroundColor: "rgb(255 255 255)", // Establece el color de fondo en negro
          }}>
            <div className="limitealtura"   style={{
              backgroundColor: "rgb(255 255 255)", // Establece el color de fondo en negro
            }}>


              <div className="itemProduct"   style={{
                backgroundColor: "rgb(255 255 255)", // Establece el color de fondo en negro
              }}>


                <div
                  className="imagencarrousel"
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgb(255 255 255)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      height:'50px',
                      backgroundColor: "rgb(255 255 255)",
                      
                     
                    }}
                  >
                    <h4 className="h4-carousel" style={{marginTop:'0'}}>{product.title}</h4>
                  </div>


                  <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height:'150px',
                    
                    
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="imageCarr"
                  />
                  </div>

                </div>


                

                <div className="itemProductTitle">
                  <h3 className="h3-Carousel">${product.price}</h3>

                  <Typography
                    component="legend"
                    sx={{
                      fontSize: "17px",
                      lineHeight: "1.21053",
                      fontWeight: 300,
                      letterSpacing: "0em",
                      fontFamily:
                        '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                      color: "black",
                    }}
                  ></Typography>

                  {/*   <Rating
                    name="read-only"
                    value={parseInt(product.rating)}
                    readOnly
                  />*/}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >




                    <button
                      className="buttonApple2"
                      style={{ padding: "5px", height: "40px" }}
                      onClick={() => handleViewProduct(product)}

                    

                    >
                      Ver más
                    </button>




{/*
                    <button 
  className="buttonApple"
  style={{ backgroundColor: checkProductInCart(product) ? 'rgb(147 157 187)' : '' }} // Agregar estilo de fondo azul oscuro si está en el carrito
  onClick={() => {
    const isProductInCart = checkProductInCart(product);
    isProductInCart ? removeFromCart(product) : addToCart(product);
  }}
>
  {checkProductInCart(product) ? "Eliminar" : "Comprar"}
</button>*/}


                  </div>



                </div>
              </div>
            </div>
          </Item>
        ))}
      </Carousel>
    </div>
  );
}
