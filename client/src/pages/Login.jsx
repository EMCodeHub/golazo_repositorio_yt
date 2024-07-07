import "../components/css/form.css";

import Formulario from "../components/Formulario";

import { Footer } from "../components/Footer";


//import { Cart } from '../components/Cart.jsx';

import { useEffect } from "react";

import CartDrawer from "../components/CartDrawer";


function LoginPag() {


  useEffect(() => {
    // Smooth scroll hacia el header al cargar el componente
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);




  return (
    <>

    
      <div className="contenedor">
        <Formulario />
      </div>

      <CartDrawer />
      <div>
        <Footer />
      </div>
    </>
  );
}

export default LoginPag;
