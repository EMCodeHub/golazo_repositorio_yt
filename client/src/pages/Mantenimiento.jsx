


import { useNavigate } from "react-router-dom";

import HomeVecesVisitada from "../components/HomeVecesVisitada";


const Mantenimiento = () => {


  const navigate = useNavigate();


  const handleClick = (route) => {
    navigate(route);
  };


  const handleSession = () =>{

    localStorage.clear();

    navigate('/');

  };

  const styles = {

  
    container: {
      backgroundColor: "#1a1a1a",
      color: "#fff",
      padding: "20px",
      borderRadius: "15px",
      maxWidth: "400px",
      margin: "0 auto",
      marginTop: "100px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
    },
    list: {
      listStyleType: "none",
      padding: "0",
      margin: "0",
    },
    item: {
      cursor: "pointer",
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "10px",
      transition: "background-color 0.3s ease",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      marginRight: "10px",
      fontSize: "20px",
    },
  };
  




  return (



    <div style={styles.container}>


<div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

<button onClick={handleSession} style={{background:"green", marginTop:"50px", marginBottom:"50px"}}>Cerrar sesion</button>

</div>


      <h2 style={{ color: "white", marginBottom:'100px', display:"flex", justifyContent:"center", alignItems:"center"}}>Menú de Mantenimiento</h2>

      <ul style={styles.list}>
        <li style={styles.item} onClick={() => handleClick("/pedidos")}>
          <span style={styles.icon}>📦</span> Gestor de Pedidos
        </li>
        <li style={styles.item} onClick={() => handleClick("/productos")}>
          <span style={styles.icon}>🛒</span> Gestor de Productos
        </li>

        {/* <li style={styles.item} onClick={() => handleClick('/ejemplo')}>
          <span style={styles.icon}>🎁</span> Gestor de Códigos de Descuento para Influencers
        </li>
  */}

        <li style={styles.item} onClick={() => handleClick("/usuarios")}>
          <span style={styles.icon}>🎁</span> Gestor de usuarios vs codigo
          pedido
        </li>

        <li style={styles.item} onClick={() => handleClick("/consultas")}>
          <span style={styles.icon}>🎁</span> Gestor de consultas recibidas
          desde formulario web
        </li>


        

      </ul>







      <HomeVecesVisitada />
    </div>
  );
};

export default Mantenimiento;



