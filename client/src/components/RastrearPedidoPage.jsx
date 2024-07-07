// Este componente no hay que confundirlo con el componente Cart.jsx,  debido a que este componente es la "pagina"
//previa a la compra, donde se rellenan los datos de la dirección del cliente y se conforma el carrito
//Tambien en esta misma página se podrá dar seguimiento al pedido (TrackingComponent)

import "./css/carrito.css"; // estilos generales del componente

import { useState, useEffect, useRef } from "react";
import { useCart } from "../hooks/useCart.js";
import { useNavigate } from "react-router-dom";

import {
  CuboBasura, Camion
} from "./svgNavbar.jsx";

import {Listadelacompra} from "./svgNavbar.jsx";









//----COMPONENTES---//

//este componente es muy importante, es el formulario donde el usuario rellenará los datos de envío y se procesará el PEDIDO
import CheckoutForm from "./CheckoutForm.jsx";

//este componente es el que permite al cliente hacer un seguimiento de su productos por Código de pedido

import TrackingComponent from "./TrackingComponent.jsx";

//----COMPONENTES---//

//iconos

import { ClearCartIcon } from "./Icons.jsx";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DeleteIcon from "@mui/icons-material/Delete";

//para no hacer PropDrill, hemos creado un hook que nos permite acceder a un estado global, con un conjunto de funciones asociadas.
//estas funciones y objetos-estado son:  (validacion, alterarValidacion, random, alterarRandom)
import useValidacion from "../hooks/useValidacion.jsx";

import "./css/fonts/fonts5144.css"; // importar fuente de apple
import "./css/Mostrador.css"; // Importar estilos boton de apple

// a continuación nos adentramos en el componente, el cual es complejo por su conexión con otros componentes
// tambien es "complejo",porque dependiendo de si se ha hecho clic en algun boton u otro, deberemos de coordinar la aparición y desaparecion
// de elementos en nuestro DOM. (En otras palabras, nuestra páquina, aquello visible.)

const CarritoPage = () => {



  const [nombre, setNombre] = useState(false);

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





  const [usuariofinal, setUserDefinitivo] = useState(null);




  useEffect(() => {


    const usuariosinregistro = localStorage.getItem("usersinregistro");
    
    // Si 'idsinregistro' no existe, obtener el valor de 'id' en su lugar
    const user = usuariosinregistro ? usuariosinregistro : localStorage.getItem("user");

    
    if (user) {

      setUserDefinitivo(user);


    }
  }, []);





  const [isVisibles, setIsVisibles] = useState(false);


  const toggleVisibilitys = () => {
    setIsVisibles(!isVisibles);
  };





  const handleCerrarSesionUsuario = () => {


    localStorage.clear();

    setUserDefinitivo(null);

    setIsVisibles(!isVisibles);

  
}




  return (


    
    <div className="carrito-container" ref={cartRef}>




      {usuariofinal && (
        
        
        <div style= {{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', alignContent:'center', gap:'15px'}}>
    
        <button className="button-carritoPage12" style={{  color: 'white',border: 'solid 1px white' , width: '150px' , borderRadius:"20px", marginBottom:'10px', background:'rgb(193 88 88 / 14%)',     height: '45px'}} onClick={handleCerrarSesionUsuario}>
        Cerrar sesion
      </button>

        <div className="div-carritoPage1">Bienvenido {usuariofinal}</div>
      
        </div>

      
      )}














      <div className="carrito-content">


        

          <div className="infofinal">


            <button className="seguircomprando2"  onClick={() => {
              toggleVisibilitys();
              
              toggleNombree();
             
            }}>

              {/*  <Link to="/envios" style={{ textDecoration: "none" }}>*/}



              <div style={{ cursor: "pointer" }}></div>





              <div style= {{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', alignContent:'center', gap:'15px'}}>


              <p className="pCarritoPage221">
              {nombree ? 'Ver mis pedidos' : 'Ver mis pedidos'} 
          </p>

          <Camion/>

              
              
                  </div>








          




            </button>


          </div>
      



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

      {isVisibles && <TrackingComponent />}
    </div>
  );
};

export default CarritoPage;
