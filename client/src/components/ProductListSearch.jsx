// este es el componente donde se renderizan los productos  buscados en la barra de busqueda
//estilos principales del componente



import "./css/ProductListSearch.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

//el componente rating son las 5 estrellas para evaluar el producto
import { Rating } from "@mui/material";

import axios from "axios";

import "./css/fonts/fonts5144.css"; //fuente de apple
import "./css/Mostrador.css"; //boton de apple

//inicia nuestro componente con el objeto products, el cual nos llega desde el hook, conectado con el service... (servicio)

function ProductListSearch({ products }) {



  const enviarMensajeWhatsApp = async (product) => {
    try {
      // Dato a enviar
      const dato = { title: product.title };

      const baseURL = import.meta.env.VITE_API_BASE_URL;

      // Llamada POST utilizando Axios
      await axios.post(`${baseURL}/api/pedidossinregistro`, dato);

      // Número de teléfono
      const numeroTelefono = import.meta.env.VITE_NUMERO_TELEFONO;

      // Mensaje que se enviará
      const mensaje = `Buenos días, quiero comprar ${product.title}`;

      // Crear el enlace de WhatsApp con el número de teléfono y el mensaje
      const url =
        "https://wa.me/" +
        numeroTelefono +
        "?text=" +
        encodeURIComponent(mensaje);

      // Redirigir al usuario al enlace de WhatsApp creado
      window.location.href = url;
    } catch (error) {
      console.error("Error al enviar el mensaje a través de WhatsApp:", error);
    }
  };

  const navigate = useNavigate();

  // establecemos el numero máximo de protuctos por página, lo que significa que habrá un boton de mostrar más que cargará otros 9 productos

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  //esa función nos hace navegar hacia la ruta descriptionhome

  const handleViewProduct = (product) => {

    
    const productid = product.id;

    navigate(`/descriptionhome/${productid}`);


  };

  //lógica de las páginas,maximo 9 productos por renderizado (9 productos cada vez que se hace clic en mostrar más y 9 productos por defecto)

  const startSlice = (currentPage - 1) * itemsPerPage;
  const endSlice = startSlice + itemsPerPage;

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div style={{ width: "1000px", marginTop: "50px" }}>
      <ul className="movies">
        {products.slice(0, endSlice).map((product, index) => (
          <li className="movie" key={index}>
            <div className="movie-box">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <button
                  className="buttonApple2"
                  style={{ padding: "5px", height: "40px" }}
                  onClick={() => handleViewProduct(product)}
                >
                  Ver más
                </button>


             

                


              </div>

              <div className="movie-detailss" style={{ height: "100px" }}>
                <h4 className="h4-productListSearch">{product.title}</h4>
              </div>

              <div className="movie-image-containerd">
                <img src={product.thumbnail} alt={product.title} />
              </div>

              <div
                className="movie-detailss"
                style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  height: "40px",
                }}
              >
                <h3 className="h3-productListSearch">${product.price}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {endSlice < products.length && (
        <div className="div-ProductListSearch123">
          <button
            onClick={handleShowMore}
            className="button-ProductListSearch123"
          >
            Mostrar más
          </button>
        </div>
      )}
    </div>
  );
}

function NoProductsResults({ message }, { products }) {
  const hasProducts = products?.length > 0;

  return (
    <div>{message && <p className="p-ProductListSearch1234">{message}</p>}</div>
  );
}

export function Products({ products }, { message }) {
  const hasProducts = products?.length > 0;

  return hasProducts ? (
    <ProductListSearch products={products} />
  ) : (
    <NoProductsResults message={message} products={products} />
  );
}
