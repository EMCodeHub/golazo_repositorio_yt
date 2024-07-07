//traemos el estilo principal del componente

import "./css/Buscador.css";

// traemos los estilos de letra de apple y estilo de letra del boton de apple


import "./css/fonts/fonts5144.css";
import "./css/Mostrador.css";

import { useState, useEffect, useRef, useCallback } from "react"; // hooks de react

import { useProducts } from "../hooks/useProducts.js"; //hook preparado por nosotros

import { Products } from "./ProductListSearch.jsx"; // traemos el componente que renderizará los productos buscados

import debounce from "just-debounce-it";

import { useNavigate } from "react-router-dom";


import useValidacion from "../hooks/useValidacion";



function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}


// este componente se compone la barra de búsqueda y el boton de buscar

// dentro de este componente existe el componente Products, que renderiza los productos filtrados por nombre de búsqueda

// los productos filtrados nos llegan desde import { useProducts } from "../hooks/useProducts.js", que a su vez tiene dentro  --> import { searchProducts, recibeMessage } from '../services/products.js'



function BuscadorProductosBarraBusqueda() {



  const { handledivappear } = useValidacion();



  const navigate = useNavigate();


  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { products, loading, getProducts, message } = useProducts({
    search,
    sort,
  });


  const debouncedGetProducts = useCallback(
    debounce((search) => {
      console.log("search", search);
      getProducts({ search });
    }, 300),
    [getProducts]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getProducts({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetProducts(newSearch);
  };

  return (



    <div className="todo">
      <div className="search-container">
        <header>
          <form className="formato" onSubmit={handleSubmit}>
            <input
              className="input-Buscador"
              onChange={handleChange}
              value={search}
              name="query"
              placeholder="Buscar golazo.net"
              style={{color:'black'}}
            />
            <button
              style={{ fontWeight: 600, backgroundColor:"#03509d"}}
              type="submit"
              onClick={handleSubmit}
              className="buttonApple"
              title="Encuentra el producto que buscas" // Agregamos el título para el tooltip
            >
              Buscar
            </button>
          </form>

          <div className="divBuscadorHome">
            {message && <p className="pBuscadorHome">{message}</p>}


            <div
            style={{
              fontSize: '18px',
              lineHeight: 1.1428571429,
              fontWeight: 600,
              letterSpacing: '.007em',
              fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
              color: 'white',
              cursor: 'pointer', // Para mostrar que es interactivo
              marginTop:'17px'
            }}
          >
           Categorias

          </div>



          <div

          onClick={() => {
            handledivappear();
            navigate("/shop", { state: { category: "Smartphones" } });
          }}
    


        


            style={{
              fontSize: '15px',
              lineHeight: 1.1428571429,
              fontWeight: 600,
              letterSpacing: '.007em',
              fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
              color: 'white',
              cursor: 'pointer', // Para mostrar que es interactivo
              marginTop:'22px',
              marginLeft:'20px',
            }}
          >
           Celulares

          </div>


          <div

          
          onClick={() => {
            handledivappear();
            navigate("/shop", { state: { category: "Televisores" } });
          }}
    

        



          style={{
            fontSize: '15px',
            lineHeight: 1.1428571429,
            fontWeight: 600,
            letterSpacing: '.007em',
            fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
            color: 'white',
            cursor: 'pointer', // Para mostrar que es interactivo
            marginTop:'22px',
            marginLeft:'20px',
          }}
        >
         Televisores

        </div>


        <div

        onClick={() => {
          handledivappear();
          navigate("/shop", { state: { category: "Videojuegos" } });
        }}
  


       


        style={{
          fontSize: '15px',
          lineHeight: 1.1428571429,
          fontWeight: 600,
          letterSpacing: '.007em',
          fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
          color: 'white',
          cursor: 'pointer', // Para mostrar que es interactivo
          marginTop:'22px',
          marginLeft:'20px',
        }}
      >
       Videojuegos

      </div>

      
      <div


      onClick={() => {
        handledivappear();
        navigate("/shop", { state: { category: "Laptops" } });
      }}


      style={{
        fontSize: '15px',
        lineHeight: 1.1428571429,
        fontWeight: 600,
        letterSpacing: '.007em',
        fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
        color: 'white',
        cursor: 'pointer', // Para mostrar que es interactivo
        marginTop:'22px',
        marginLeft:'20px',
      }}
    >
     Laptops

    </div>



    <div


    onClick={() => {
      handledivappear();
      navigate("/shop", { state: { category: "Tablets" } });
    }}


    style={{
      fontSize: '15px',
      lineHeight: 1.1428571429,
      fontWeight: 600,
      letterSpacing: '.007em',
      fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
      color: 'white',
      cursor: 'pointer', // Para mostrar que es interactivo
      marginTop:'22px',
      marginLeft:'20px',
    }}
  >
   Tablets

  </div>










          </div>

          
        </header>
      </div>
      <div className="page">


      
        <main style={{
          marginTop:"-30px",
          overflowY:  "auto",
          overflowX: "hidden",
          backgroundColor:"rgba(22, 22, 23)",
        }} className="scrollProductsMain">
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <Products products={products} message={message} />
          )}
        </main>
      </div>
    </div>
  );
}

export default BuscadorProductosBarraBusqueda;
