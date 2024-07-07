import "../components/css/form.css";

import RecordatorioPage from "../components/RecordatorioPage";

import { Footer } from "../components/Footer";

//import { Cart } from "../components/Cart.jsx";
import CartDrawer from "../components/CartDrawer.jsx";

function Recordatorio() {
  return (
    <>
      <div className="contenedor">
        <RecordatorioPage />
      </div>
      <CartDrawer />
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Recordatorio;
