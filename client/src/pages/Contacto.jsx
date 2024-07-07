import CartDrawer from "../components/CartDrawer";
import ContactoComponent from "../components/ContactoComponent";

import { Footer } from "../components/Footer";
import { useEffect } from "react";





function Contacto () {


  useEffect(() => {
    // Smooth scroll hacia el header al cargar el componente
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);



  return (
    <div>

    <ContactoComponent/>

    <CartDrawer/>

    <Footer />
      
    </div>
  )
}

export default Contacto
