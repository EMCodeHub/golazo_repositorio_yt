import { Link } from "react-router-dom";
import "./css/NavbarCrud.css";
import './css/fonts/fonts5144.css';
import './css/Mostrador.css';



function Navbar() {

  const handleLogout = () => {
    localStorage.clear(); // Limpiar el local storage al cerrar sesión
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "/login"; // O redirecciona a donde desees
  };



  return (

    <div className="navbarcrud">

      <ul>
        <li>

          <button className="buttonApple" style={{width:'200px'}} onClick={handleLogout}>Cerrar Sesión</button>


        </li>


        <li>

        <button className="buttonApple" style={{width:'200px'}}>

          <Link to="/mantenimiento">
           Mantenimiento
          </Link>

        </button>

      </li>


        <li>
          <button className="buttonApple" style={{width:'200px'}}>
            <Link to="/productos/new">
              Crear Producto
            </Link>
          </button>
        </li>


        <li>
        <button className="buttonApple" style={{width:'200px'}}>
          <Link to="/productos">
            Volver
          </Link>
        </button>
      </li>



      </ul>
    </div>
  );
}

export default Navbar;
