import LegalInfo from "../components/LegalInfo";

import { Footer } from "../components/Footer";


import { useEffect } from "react";

import CartDrawer from "../components/CartDrawer";



function Legal() {


  useEffect(() => {
    // Smooth scroll hacia el header al cargar el componente
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);





  return (
    <div>


    <LegalInfo/>


    <CartDrawer/>

    <Footer />
      
    </div>
  )
}

export default Legal
