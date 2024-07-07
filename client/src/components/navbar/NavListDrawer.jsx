import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../css/fonts/fonts5144.css";



import "../css/Mostrador.css";


import CustomizedMenus from "../../components/CustomizedMenus.jsx";




import useValidacion from "../../hooks/useValidacion";


const navArrayLinks = [

  {
    title: "Home",
    path: "/",
    
  },

  {
    title: "Tienda",
    path: "/shop",
    
  },
  {
    title: "Login",
    path: "/login",
    
  },
  
  {
    title: "Bolsa",
    path: "/carrito",
    
  },

  {
    title: "Rastrear pedido",
    path: "/rastrear",
    
  },




];



















function NavListDrawer({ setOpen }) {


  
  const { handleopendrawer, OpenDrawer } = useValidacion();


  const [categorias, setCategorias] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Hacer la llamada Axios para obtener las categorías

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    axios
      .get(`${baseURL}/api/showCategorias`)
      .then((response) => {
        setCategorias(response.data.categorias);
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });
  }, []); // Esta llamada solo se hace una vez al cargar el componente



  return (
    <div style={{ width: "250px" }}>
      <nav>

   { /*  
  
      <div
     
      style={{
        fontSize: '19px',
        lineHeight: 1.1428571429,
        fontWeight: 600,
        letterSpacing: '.007em',
        fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
        color: 'rgb(83 92 99)',
        cursor: 'pointer', // Para mostrar que es interactivo
        marginTop:'17px',
        marginLeft: '30px',
      }}
    >
      Categorías
    </div>*/}





{
/*

        
      <div
     
      style={{
        fontSize: '19px',
        lineHeight: 1.1428571429,
        fontWeight: 600,
        letterSpacing: '.007em',
        fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
        color: 'rgb(83 92 99)',
        cursor: 'pointer', // Para mostrar que es interactivo
        marginTop:'70px',
        marginLeft: '30px',
        marginBottom:'30px',
        
      }}
    >
    Menú
    </div>
    */}


    
      
    <ul style={{ listStyle: 'none', padding: '0', display:'flex', flexDirection:"column", marginLeft:'30px', alignItems:'flex-start', marginBottom:'20px'}}>
    {navArrayLinks.map((item) => (
      <li key={item.title} style={{ padding: '0', margin: '0', marginBottom: '10px' }}>
        <div
          onClick={() => {
            navigate(item.path); handleopendrawer(false);
            // Puedes agregar más acciones aquí si lo necesitas
          }}
          style={{
            fontSize: '17px',
            lineHeight: 1.1428571429,
            fontWeight: 600,
            letterSpacing: '.007em',
            fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
            color: 'rgb(255 241 241)',
            cursor: 'pointer', // Para mostrar que es interactivo
            marginTop:'20px'
          }}
        >
          {item.title}
        </div>


      </li>
    ))}
  </ul>



  




    {categorias.map((categoria, index) => (
      <CustomizedMenus key={index} categoria={categoria}  />
    ))}















      </nav>
    </div>
  );
}



export default NavListDrawer;
