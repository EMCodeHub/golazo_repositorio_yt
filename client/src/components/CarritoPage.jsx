// Este componente no hay que confundirlo con el componente Cart.jsx,  debido a que este componente es la "pagina"
//previa a la compra, donde se rellenan los datos de la dirección del cliente y se conforma el carrito
//Tambien en esta misma página se podrá dar seguimiento al pedido (TrackingComponent)

import "./css/carrito.css"; // estilos generales del componente

import { useState, useEffect, useRef } from "react";
import { useCart } from "../hooks/useCart.js";
import { useNavigate } from "react-router-dom";

import {
  CuboBasura
} from "./svgNavbar";

import {Listadelacompra} from "./svgNavbar.jsx";


//----COMPONENTES---//

//este componente es muy importante, es el formulario donde el usuario rellenará los datos de envío y se procesará el PEDIDO
import CheckoutForm from "../components/CheckoutForm.jsx";


import CheckoutFormNoRegistered from "../components/CheckoutFormNoRegistered.jsx";

//este componente es el que permite al cliente hacer un seguimiento de su productos por Código de pedido

import TrackingComponent from "../components/TrackingComponent.jsx";

//----COMPONENTES---//

//iconos

import { ClearCartIcon } from "./Icons.jsx";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";



import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";



import {
  BolsaCarritoEstilizadanegra, Camion
} from "./svgNavbar";



import DeleteIcon from "@mui/icons-material/Delete";

//para no hacer PropDrill, hemos creado un hook que nos permite acceder a un estado global, con un conjunto de funciones asociadas.
//estas funciones y objetos-estado son:  (validacion, alterarValidacion, random, alterarRandom)
import useValidacion from "../hooks/useValidacion";

import "./css/fonts/fonts5144.css"; // importar fuente de apple
import "./css/Mostrador.css"; // Importar estilos boton de apple

// a continuación nos adentramos en el componente, el cual es complejo por su conexión con otros componentes
// tambien es "complejo",porque dependiendo de si se ha hecho clic en algun boton u otro, deberemos de coordinar la aparición y desaparecion
// de elementos en nuestro DOM. (En otras palabras, nuestra páquina, aquello visible.)

const CarritoPage = () => {



  const { invisibilizarbotoncarrito, handleinvisibilizarcarritotrue} = useValidacion();


  useEffect(() => {
    // Esta función se ejecutará cada vez que el componente se monte o la página se cargue
    handleinvisibilizarcarritotrue();
  }, []); // El segundo argumento del useEffect es un array vacío para indicar que solo se ejecutará una vez, al montar el componente


  const [nombre, setNombre] = useState(true);


  const toggleNombre = () => {
    setNombre(!nombre);
  };






  const [nombree, setNombree] = useState(false);



  const toggleNombree = () => {
    setNombree(!nombree);
  };






  const { validacion } = useValidacion();
  const { alterarValidacion, alterarRandom } = useValidacion();
  const [buttonVisible, setButtonVisible] = useState(true);
  const { cart, removeFromCart } = useCart();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mostrarBotonLogin, setMostrarBotonLogin] = useState(false); // Estado para controlar la visibilidad del botón "Iniciar sesión"
  const [mostrarBotonComprar, setMostrarBotonComprar] = useState(true); // Estado para controlar la visibilidad del botón "Comprar"
  const navigate = useNavigate();

  // constante donde almacenamos el dato del valor total a pagar
  // utilizamos reduce para hacer esta "suma", y usamos el estado global cart que nos traemos desde, usecart(), el cual no deja de ser un objeto.

  const precioTotal = cart.reduce(
    (total, producto) => total + producto.price * producto.quantity,
    0
  );

  //fijamos a 2 decimales máximo este precio total

  const precioTot = parseFloat(precioTotal.toFixed(2));

  const cartRef = useRef(null); // Referencia al elemento carrito-container, queremos este identificador ÚNICO.

  
  
  useEffect(() => {
 
    cartRef.current.scrollIntoView({ behavior: "smooth" });
  }, [alterarValidacion]);
  
  
  
  useEffect(() => {
    
    const token = localStorage.getItem("token");
    const message = localStorage.getItem("message");
    if (token && message) {
      setMostrarBotonComprar(false); // Ocultar el botón "Comprar" si el usuario está logeado
    } else {
      setMostrarMensaje(true);
      setMostrarBotonLogin(true); // Mostrar el botón "Iniciar sesión"
      setTimeout(() => {
        setMostrarMensaje(false);
      }, 4000); // Ocultar el mensaje después de 4 segundos
    }
    // Desplazar automáticamente al elemento del carrito cuando la página cargue
    cartRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);





  const handleComprar = () => {



    const token = localStorage.getItem("token");

    const message = localStorage.getItem("message");


    if (token && message) {
      if (precioTot !== 0) {
        setMostrarFormulario((prevState) => !prevState); // Cambiar el estado para mostrar u ocultar el formulario
        setMostrarMensaje(false); // Ocultar el mensaje si el usuario está logeado
      }
    } else {
      console.log("pulsando boton");
      setMostrarMensaje(true);
      setMostrarBotonLogin(true); // Mostrar el botón "Iniciar sesión"
      setTimeout(() => {
        setMostrarMensaje(false);
      }, 2000); // Ocultar el mensaje después de 2 segundos
    }
  };

  const handleSeguirComprando = () => {
    navigate("/shop", { state: { category: "all" } });
  };

  const handleLogin = () => {
    navigate("/login"); // Navegar a la página de inicio de sesión al hacer clic en el botón "Iniciar sesión"
  };

  // Obtenemos el dato de nuestro usuario, el cual lo tenemos almacenado en localstorage
  // lo podríamos haber almacenado en variables de sesion, cookies... pero estamos utilizando local storage




  const [usuariolocalstorage, setUsuariolocalstorage] = useState(null);


  const [tokenusuario, settokenusuario] = useState(null);



  useEffect(() => {

    const usuario = localStorage.getItem("user");

    setUsuariolocalstorage(usuario);



    const token = localStorage.getItem("token");

    settokenusuario(usuario);






}, []); // El arr






  const [isVisibles, setIsVisibles] = useState(false);



  const toggleVisibilitys = () => {
    setIsVisibles(!isVisibles);
  };






  const [sinregistrovisibleform, setsinregistrovisibleform] = useState(false);


  const [sinregistrovisibleform2, setsinregistrovisibleform2] = useState(false);




  const handleSinRegistro = () =>{


    setsinregistrovisibleform(!sinregistrovisibleform);

    console.log('estoy invirtiendo sinregistrovisibleform' );
    console.log(sinregistrovisibleform);

  }





  const handleCerrarSesionUsuario = () => {


    localStorage.clear();

    setUsuariolocalstorage(null);

  
}




  return (


    
    <div className="carrito-container" ref={cartRef}>


      {usuariolocalstorage && (  
        
        <div style= {{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', alignContent:'center', gap:'15px'}}>
    
        <button className="button-carritoPage12" style={{  color: 'white',border: 'solid 1px white' , width: '150px' , borderRadius:"20px", marginBottom:'10px', background:'rgb(193 88 88 / 14%)',     height: '45px'}} onClick={handleCerrarSesionUsuario}>
        Cerrar sesion
      </button>


        <div className="div-carritoPage1">Bienvenido {usuariolocalstorage}</div>
      
        </div>
    
      
      
      )}


      {console.log(usuariolocalstorage)}


      {mostrarBotonLogin &&  usuariolocalstorage === null   &&   tokenusuario === null   &&   (


        <div style = {{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>


        {!sinregistrovisibleform  && (
         
          <div style = {{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>

          
        <button className="button-carritoPage12" style={{  color: 'white',border: 'solid 1px white' , width: '300px' , borderRadius:"20px", marginBottom:'10px', background:'rgb(193 88 88 / 14%)',     height: '45px'}} onClick={handleLogin}>
        Iniciar sesión
      </button>


        <button className="button-carritoPage12" style={{  color: 'white',border: 'solid 1px white' , width: '300px' , borderRadius:"20px", marginBottom:'80px', background:'rgb(193 88 88 / 14%)',     height: '45px', }}
        onClick={handleSinRegistro}>
        Continuar sin iniciar sesion
      </button>

      </div>

    )}

      </div>


      )}






      {invisibilizarbotoncarrito &&



      <button
        onClick={() => {
          alterarValidacion();
          toggleNombre();
         
        }}
        className="seguircomprando2"
        style={{ marginBottom: "40px", height: "70px" }} 
      > 
      


<div style= {{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', alignContent:'center', gap:'15px'}}>


<p style={{fontSize:'15px'}}>Ver Bolsa</p>  
  <BolsaCarritoEstilizadanegra />


    </div>


    </button>






}

      

      <div className="carrito-content">
        {validacion ? (
          <table className="carrito-table">
            <thead>
              <tr>
                <th className="th-carritoPage112">
                <Listadelacompra />
                </th>
                <th className="th-carritoPage115">
                  <MonetizationOnIcon />
                </th>
                <th className="th-carritoPage12">
                  <ProductionQuantityLimitsIcon />
                </th>
                <th className="th-carritoPage123">
                  <ClearCartIcon />
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="tr-carritoPage12">
                  <td className="tr-carritoPage12">{item.title}</td>
                  <td className="tr-carritoPage12">{item.price}</td>
                  <td className="tr-carritoPage12">
                    
                      <p>{item.quantity}</p>
                   
                  </td>
                  <td className="tr-carritoPage12" onClick={() => removeFromCart(item)}>


                    <CuboBasura onClick={() => removeFromCart(item)} />






                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="total-cell">
                  <b> $ TOTAL:</b>
                </td>
                <td className="totalprice">
                  <b>{precioTot}</b>
                </td>
              </tr>
              {cart.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    <b className="b-carritopage123">
                      No tienes productos en tu carrito
                    </b>
                  </td>
                </tr>

               
              )}
              <tr>
                <td colSpan="2">


                  <button
                    className="buttonApple"
                    onClick={handleSeguirComprando}
                    style = {{backgroundColor: 'rgb(109 92 92 / 43%)', color:'white', fontWeight:500, border: 'solid 1px black'}}
                  >
                    Ir a la Tienda
                  </button>
                </td>
                <td colSpan="2">




                {!sinregistrovisibleform  && (

                  <button
                    className="buttonApple"
                    onClick={handleComprar}
                    disabled={precioTot === 0}
                    style = {{backgroundColor: 'rgb(23 106 189)', color:'white'}}
                  >
                    {precioTot === 0
                      ? "🛒"
                      : mostrarFormulario
                      ? "Rellene⬇️"
                      : "Pagar"}
                  </button>
        
            )}



            
            {sinregistrovisibleform  && (

              <button
                className="buttonApple"
                
                disabled={precioTot === 0}
                style = {{backgroundColor: 'rgb(23 106 189)', color:'white'}}
              >
            Rellene⬇️
              </button>
    
        )}


















                </td>
              </tr>

              <tr>
                {mostrarMensaje && !sinregistrovisibleform && (
                  <div className="div-iniciar-sesion">
                    Inicia sesión o continua sin iniciar sesión.
                  </div>
                )}
              </tr>
            </tbody>
          </table>
        ) : (



          <div className="infofinal">
           
          </div>


        )}



      </div>







      <div
        className={`checkout-form ${
          mostrarFormulario && precioTot !== 0 ? "claseCreada" : ""
        }`}
        style={{
          height: mostrarFormulario && precioTot !== 0 ? "auto" : "0",
          overflow: "hidden",
          transition: "height 0.5s ease",
        }}
      >


        {mostrarFormulario && precioTot !== 0 && (
          <CheckoutForm
            buttonVisible={buttonVisible}
            setButtonVisible={setButtonVisible}
          />
        )}







      </div>



      <div>
    
      
      {sinregistrovisibleform && precioTot !== 0 && (
        <CheckoutFormNoRegistered

        />
      )}
      
      
      </div>



     


















    </div>
  );
};

export default CarritoPage;
