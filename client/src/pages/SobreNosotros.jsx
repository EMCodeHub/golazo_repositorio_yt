import SobreNosotrosComponent from "../components/SobreNosotrosComponent";

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


    <SobreNosotrosComponent/>


    <CartDrawer/>

    <Footer />
      
    </div>
  )
}

export default Legal
