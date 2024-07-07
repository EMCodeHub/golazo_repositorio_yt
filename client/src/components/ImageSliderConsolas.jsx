import { useState, useEffect } from "react";
import { StyleSheetManager } from "styled-components";
import axios from "axios";
import {useNavigate } from "react-router-dom";


import './css/ImageSliderEstilos.css';     // Hoja de estilos CSS principal
import './css/fonts/fonts5144.css';    // nos traemos la fuente de Apple
import './css/Mostrador.css';           // Importar estilos CSS adicionales para terminar de definir el boton de Apple 


const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "absolute",
  top: "0",
  left: "0",
  transition: "opacity 0.5s ease-in-out",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
  overflow: "hidden",
};



const ImageSliderCelulares = () => {


  const navigate = useNavigate(); 


  //  Llamar a la función handleViewProduct con el producto como parámetro
//  Esto con el objetivo de que cuando hagamos clic en el producto indicado, le pasemos el producto como parámetro

  const handleViewProduct = (product) => {
    // Llamar a la función handleViewProduct con el producto como parámetro
    if (product) {
      const productid = product.id;

      navigate(`/descriptionhome/${productid}`);
    }
  };

  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/masvendidocelulares`, { timeout: 5000 });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Ejecutar solo una vez al montar el componente

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === products.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

 
  const currentProduct = products[currentIndex]; 


  


  const baseURLL = import.meta.env.VITE_IMG_SITIO_WEB;


  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${currentProduct ? `${baseURLL}/${currentProduct.imagenhome}` : ''})`,
  };


  





  return (


    <StyleSheetManager shouldForwardProp={(prop) => !prop.startsWith("isRTL")}>
      <div style={sliderStyles}>
        <div style={slideStylesWidthBackground}>
          {currentProduct && (
            <div className="estilosdiv123">
              <h2  className="estilosdiv1234">{currentProduct.title}</h2>
              <h3  className="estilosdiv12345">{currentProduct.descriptionhome}</h3>
              <button className="buttonApple" onClick={() => handleViewProduct(currentProduct)}>Ver más</button>
            </div>
          )}
        </div>
      </div>
    </StyleSheetManager>
  );
};

export default ImageSliderCelulares;
