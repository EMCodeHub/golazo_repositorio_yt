import RastrearPedidoPage from "../components/RastrearPedidoPage";

import { Footer } from "../components/Footer";

import "../components/css/carrito.css";


import CartDrawer from "../components/CartDrawer";




import { useEffect } from "react";


function Shop() {


  useEffect(() => {
    // Smooth scroll hacia el header al cargar el componente
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);




  return (

<>
    <div className="todoflex">
    <div className="carrito">
      <RastrearPedidoPage />
    </div>


    <CartDrawer/>


  <Footer/>
    
    </div>
    </>

  );
}

export default Shop;
