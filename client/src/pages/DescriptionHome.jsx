import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Footer } from "../components/Footer.jsx";
import CartDrawer from "../components/CartDrawer";
import ProductDescription from "../components/ProductDescription.jsx";
import '../components/css/DescriptionShop.css'

function Description() {


  const parameternavigate = "/";


  const [producto, setProduct] = useState(null);
  const { idproduct } = useParams();





  useEffect(() => {

    const baseURL = import.meta.env.VITE_API_BASE_URL;


    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/showProductosporId/${idproduct}`);
        setProduct(response.data.producto[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    window.scrollTo({ top: 0, behavior: "smooth" });


  }, [idproduct]);




  // Si deseas mostrar un mensaje de carga mientras se carga el producto, puedes hacerlo así:
  if (!producto) {
    return <p>Cargando producto...</p>;
  }






  return (
    <>
      <div className="contenedor2">

        <ProductDescription parameternavigate={parameternavigate}  producto={producto} />
        
      </div>

      <CartDrawer />

      <Footer />
    </>
  );
}

export default Description;

  