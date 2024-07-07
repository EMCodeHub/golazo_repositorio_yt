import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importar Axios

import { Navigate, useNavigate } from 'react-router-dom';

import './css/fonts/fonts5144.css';
import iphone15Image from './imagenes/iphone15.jpg'; // Importar la imagen
import './css/Mostrador.css'; // Importar estilos CSS adicionales si es necesario

function Mostrador() {

const navigate = useNavigate();


  const [product, setProduct] = useState(null); // Estado para almacenar el producto

  useEffect(() => {
    // Función para obtener el producto de la API
    const fetchProduct = async () => {
      try {

        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/mainproduct`);
        // Establecer el producto obtenido del servidor en el estado
        setProduct(response.data.products[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    // Llamar a la función para obtener el producto cuando el componente se monte
    fetchProduct();
  }, []); // El segundo argumento vacío asegura que solo se ejecute una vez

  const handleViewProduct = () => {
    // Llamar a la función handleViewProduct con el producto como parámetro
    if (product) {
      navigate('/descriptionhome', { state: { product } });
    }
  };

  return (

    
    <div style={{
      background: "black",
      minHeight: "500px",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      flexDirection: "column",
      alignItems: "center",
      backgroundImage: `url(${iphone15Image})`, // Usar la imagen importada
      backgroundSize: "cover", // Ajustar la imagen al tamaño del contenedor
      backgroundPosition: "center", // Centrar la imagen dentro del contenedor
      paddingTop: "50px", // Añadir espacio en la parte superior del contenedor
      paddingBottom: "50px" // Añadir espacio en la parte inferior del contenedor
    }}>
      {product && (
        <>


        
          <h2 style={{
            fontSize: '32px',
            lineHeight: '1.125',
            fontWeight: 600,
            letterSpacing: '.004em',
            fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
            color: "#f5f5f7",
            marginBottom: "0px" // Añadir margen inferior al h2 para separarlo del siguiente elemento
          }}>{product.title}</h2>

          <h3 style={{
            fontSize: '19px',
            lineHeight: '1.21053',
            fontWeight: 400,
            letterSpacing: '0em',
            fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
            color: "#f5f5f7",
            marginBottom: "10px" // Añadir margen inferior al h3 para separarlo del siguiente elemento
          }}>{product.description}</h3>

        

          <button className="button" onClick={handleViewProduct}>Comprar</button>



        </>
      )}
    </div>
  );
}

export default Mostrador;
