import "../components/css/form.css";

import RegisterForm from "../components/RegisterForm";

import { Footer } from "../components/Footer";

//import { Cart } from '../components/Cart.jsx';


import { useEffect } from "react";

import CartDrawer from "../components/CartDrawer.jsx";

function LoginPag() {



  useEffect(() => {
    // Smooth scroll hacia el header al cargar el componente
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);




  return (
    <>
      <div className="contenedor">
        <RegisterForm />
      </div>
      <CartDrawer />
      <div>
        <Footer />
      </div>
    </>
  );
}

export default LoginPag;
