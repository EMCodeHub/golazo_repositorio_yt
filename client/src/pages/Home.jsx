// nos traemos los estilos generales de nuestra página home. Serán generales, NO específicos porque cada componente tendrá sus propios estilos
import "../components/css/home.css";

//Importamos los 2 hooks más utilizados de react, comunmente conocidos.
import { useEffect, useState } from "react";

//Necesitaremos Axios para hacer las llamadas a la api, tambien se puede hacer sin axios, pero axios no simplifica el proceso de llamada y respuesta al servidor, nos avisa de errores, etc.
import axios from "axios";

//para poder insertar nuestras cookies, poder utilizar este tipo de metodos: ➡️ Cookies.set
import Cookies from "js-cookie";

// estos son nustros Carrousels, los cuales nos muestran algunos productos, por categoría. Ejemplo: para celulares, nos muestra 10 celulares
//para TV, nos muestra 10 productos categoría TV,  para Laptops nos muestra 10 productos categoría Laptop.

import CarrouselHomeCelulares from "../components/CarrouselHomeCelulares";
import CarrouselHomeLaptops from "../components/CarrouselHomeLaptops";
import CarrouselHomeTv from "../components/CarrouselHomeTv";


import Buscador from "../components/Buscador";

//estos son nuestros ImageSlider (son 3 imagenes de los 3 productos más vendido por categoría, estos 3 productos más vendidos se definen en nuestra base de datos con el parámetro 1 o 0, los productos que tengan un 1, serán los más vendidos.), tenemos 3 en nuestro home (Celulares, Laptops, TV)

import ImageSliderCelulares from "../components/ImageSliderCelulares";
import ImageSliderLaptops from "../components/ImageSliderLaptops";
import ImageSliderTv from "../components/ImageSliderTv";

//este es nuestro componente Buscador, dentro de el existe la lógica de la búsqueda por la barra buscadora


import CartDrawer from "../components/CartDrawer";


// este es nuestro componente Footer, lo veremos en prácticamente toda las páginas, es donde tenemos nuestra información de empresa

import { Footer } from "../components/Footer";

//este es nuestro componente Cart, el cual será la barra lateral derecha, es decir, el div que aparecerá cuando desplegamos la lista de la compra ➡️  estará al lado derecho de nuestra aplicación (div de color blanco)

//import { Cart } from "../components/Cart";

//este componente es el que contiene las 4 categorías, lo manejaremos con GRID (css), el objetivo será tener 4 imagenes clickables, que nos redirigen a la tienda y en la tienda nos mostrará la categoría elegida.

import MicomponenteGridHome from "../components/MicomponenteGridHome";

//nos traemos los componentes que van a dar forma a nuestras cookies (son divs que contruyen el componente y reciben props, concretamente reciben funciones en sus props)

import DivCookies from "../components/DivCookies";
import PoliticaPrivacidadCookies from "../components/PoliticaPrivacidadCookies";




import useValidacion from "../hooks/useValidacion";



//objeto de estilos que le pasamos a un determinado DIV.
const containerStyles = {
  width: "100%",
  height: "450px",
  margin: "0 auto",
};





//import React, { useState } from "react";

import { AppBar, Button, Drawer, IconButton, Toolbar } from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";

import "../components/css/NavbarBuscador.css";

import NavListDrawer from "../components/navbar/NavListDrawer";



import {
  BuscadorIconHome,
  Basketshop,
  Menulineasdos,
  LogoGolazoo,
  BolsaCarritoEstilizada,
  TiendaIcon,
  Usericon 
} from "../components/svgNavbar";











const Home = () => {


  useEffect(() => {
    // Smooth scroll hacia el header al cargar el componente
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  // estados del div cookies  (accesibles para los componentes  DivCookies  y PoliticaPrivacidadCookies )

  const [showExternalDiv, setShowExternalDiv] = useState(false);
  const [showCookieBar, setShowCookieBar] = useState(true);
  const [acceptedCookies, setAcceptedCookies] = useState(false);

  // Funciones para controlar el div de las cookies, y su aceptación (accesibles para los componentes  DivCookies  y PoliticaPrivacidadCookies )

  const handleShowExternalDiv = () => {
    setShowExternalDiv(true);
  };

  const handlerejectCookies = () => {
    setShowExternalDiv(false);
    setAcceptedCookies(false);
    setShowCookieBar(false);
  };

  // useEffect para controlar si ya tenemos una cookie registrada

  useEffect(() => {
    const visitedHomePage = Cookies.get("visitedHomePage");
    if (visitedHomePage) {
      setAcceptedCookies(true);
    }
  }, []);

  // a continuación en esta función vamos a insertar en la base de datos un registro determinado cuando las cookies se acepten
  //de esta forma tendremos un control cada vez que una persona haga clic en aceptar cookies, sabremos que esa página ha sido visitada
  //Utilizaremos axios y la url de nuestra api.



  const handleAcceptCookies = async () => {

      try {


        const baseURL = import.meta.env.VITE_API_BASE_URL;

        const data = { cookie: "pagina home visitada" };



      const response = await axios.post(
        `${baseURL}/api/insertacookie`,
        data
      );



      if (response.status === 200) {
        console.log("La cookie se ha insertado correctamente en el servidor");
        Cookies.set("visitedHomePage", true, { expires: 7 }); // Asegúrate de que la cookie se establezca correctamente
        setAcceptedCookies(true);
      } else {
        console.error("Hubo un problema al insertar la cookie en el servidor");
      }
      setShowCookieBar(false);
      setShowExternalDiv(false);
    } catch (error) {
      console.error("Error al enviar la solicitud POST:", error);
    }
  };



  
  const { openn, opennn } = useValidacion();

  const { handledivappear } = useValidacion();

// de aqui para abajo es el experimento

  const [open, setOpen] = useState(false);







const navArrayLinks = [

  {
    title: "Tienda",
    path: "/shop",
    icon: <TiendaIcon />,
  },
  {
    title: "Login",
    path: "/login",
    icon: <Usericon />,
  },
  {
    title: "Carrito",
    path: "/carrito",
    icon: <Basketshop />,
  },
];





  return (
    <>



      <div className="todohome">



      <CartDrawer/>



   {/*
  <div className={`mostrarDiv ${openn ? "mostrar" : "mostrar2"}`}    >*/}


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






























    <div>


        <div style={containerStyles}>

        {/*Se mostrarán cada 3 segundos los productos más vendidos de la categoría CELULARES, los mas vendidos tendran un 1 en la base de 
       datos, se podrá hacer clic en ellos para compra directa*/ }

          <ImageSliderCelulares />
        </div>
        

         {/*A continuación tenemos el buscador de productos de nuestro Home, nos buscará cualquier producto de cualquier categoría, solo 
         escribiendo el nombre*/ }

        <div className="buscador">
       

          {/*debajo del buscador, tenemos un primer carousel de productos de la categoría celulares, sólo se mostrarán los celulares que tengan 
           un 1 en la base de datos, en el campo (carouselhome) de la base de datos, de esta forma evitamos que carguen todos los celulares y 
          evitamos sobrecargar el navegador de una elevada lista de producto*/ }


          <CarrouselHomeCelulares />
        </div>



       {/*Se mostrarán cada 3 segundos los productos más vendidos de la categoría LAPTOPS, los mas vendidos tendran un 1 en la base de 
       datos, se podrá hacer clic en ellos para compra directa*/ }

        <div style={containerStyles}>
          <ImageSliderLaptops />
        </div>

        {/*segundo carousel de productos de la categoría LAPTOPS, sólo se mostrarán los celulares que tengan 
           un 1 en la base de datos, en el campo (carouselhome) de la base de datos, de esta forma evitamos que carguen todos los celulares y 
          evitamos sobrecargar el navegador de una elevada lista de producto*/ }


        <CarrouselHomeLaptops />



      {/*Se mostrarán cada 3 segundos los productos más vendidos de la categoría TV, los mas vendidos tendran un 1 en la base de 
       datos, se podrá hacer clic en ellos para compra directa*/ }

        <div style={containerStyles}>
          <ImageSliderTv />
        </div>


          {/*tercer carousel de productos de la categoría TV, sólo se mostrarán los celulares que tengan 
           un 1 en la base de datos, en el campo (carouselhome) de la base de datos, de esta forma evitamos que carguen todos los celulares y 
          evitamos sobrecargar el navegador de una elevada lista de producto*/ }

        <CarrouselHomeTv />



        {/*Mediante este componente se mostraran las 4 categorias, con un clic en la categoria nos deriva a la tienda con la respectiva categoría 
         elegida*/ }

        <MicomponenteGridHome />


         {/*Componente Cart, siempre presente en todas las páginas, consiste en el div blanco de la derecha derecha (productos seleccionados 
          por cliente.  Este div permanecerá oculto por defecto)*/}

        


        {/*Este componente es el footer, donde tenemos la información de la empresa*/}

        <Footer />


        {/*A continuación tenemos el div de las cookies, cuando accedemos por primera vez a la pagina Home, aparecerá. Pero una vez 
           aceptadas las cookies  o rechazadas, el div desaparecerá.*/}


        {showCookieBar && !acceptedCookies && (
          <div>
            <DivCookies
              handleShowExternalDiv={handleShowExternalDiv}
              handleAcceptCookies={handleAcceptCookies}
            />

            {showExternalDiv && (
              <PoliticaPrivacidadCookies
                handleAcceptCookies={handleAcceptCookies}
                handlerejectCookies={handlerejectCookies}
              />
            )}
          </div>
        )}


        </div>


      </div>



    </>
  );
};

export default Home;
