import "./css/MicomponenteGridHome.css"; // hoja de estilos principal

import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación entre páginas

import "./css/fonts/fonts5144.css"; // fuente de apple

import "./css/Mostrador.css"; // Nos traemos una clase especial para botones con formato (Apple)

//Nos traemos las imagenes que van a representar cada categoría, en este caso, las traemos de la carpeta imagenes

//CUIDADO PARA SUBIR A UNA SUBCARPETA EN PRODUCCION, SE LE HA PUESTO      golazo delante.

import iphone15Image from "./imagenes/iphone15.jpg";
import tvs from "./imagenes/tv2.jpg";
import videojuegos from "./imagenes/videojuegos.jpg";
import laptops from "./imagenes/apple.jpg";

function MicomponenteGridHome() {
  // instanciamos navigate, para poder utilizar la navegación entre páginas

  const navigate = useNavigate();

  // estas 4 funciones hacen un navigate, pero algo importante, le estamos pasando un objeto state que contiene el objeto category
  //Esto con el objetivo que cuando haga el navigate, viaje la información de la categoría a la cual se ha hecho clic
  // Debido a que si sólo hace un navigate a la pagina, no sabrá qué categoría se hizo clic

  const handleButtonClickcelulares = () => {
    navigate("/shop", { state: { category: "Smartphones" } });
  };

  const handleButtonClickLaptops = () => {
    navigate("/shop", { state: { category: "Laptops" } });
  };

  const handleButtonClickvideojuegos = () => {
    navigate("/shop", { state: { category: "Videojuegos" } });
  };

  const handleButtonClickTV = () => {
    navigate("/shop", { state: { category: "Televisores" } });
  };

  return (
    <div className="grid-gallery-home">
      {/* Este div inicial : grid-gallery-home, es el que contiene los estilos de nuestra grilla o grid  y nos permite trabajar con la cuadrícula de 4 
      imagenes*/}

      {/* A partir de aquí comienzan las categorías, son imagenes estáticas. 4 en total  */}

      <div
        className="divclass123-Home"
        style={{ backgroundImage: `url(${iphone15Image})` }}
      >
        <h2 className="divclass1234-Home">Celulares</h2>
        <h3 className="divclass12345-Home">Categoría</h3>

        <button className="buttonApple" onClick={handleButtonClickcelulares}>
          Accede
        </button>
      </div>

      <div
        className="divclass123-Home"
        style={{ backgroundImage: `url(${laptops})` }}
      >
        <h2 className="divclass1234-Home">Laptops</h2>
        <h3 className="divclass12345-Home">Categoría</h3>

        <button className="buttonApple" onClick={handleButtonClickLaptops}>
          Accede
        </button>
      </div>

      <div
        className="divclass123-Home"
        style={{ backgroundImage: `url(${videojuegos})` }}
      >
        <h2 className="divclass1234-Home">Videojuegos</h2>
        <h3 className="divclass12345-Home">Categoría</h3>

        <button className="buttonApple" onClick={handleButtonClickvideojuegos}>
          Accede
        </button>
      </div>

      <div
        className="divclass123-Home"
        style={{ backgroundImage: `url(${tvs})` }}
      >
        <h2 className="divclass1234-Home">Televisores</h2>
        <h3 className="divclass12345-Home">Categoría</h3>

        <button className="buttonApple" onClick={handleButtonClickTV}>
          Accede
        </button>
      </div>
    </div>
  );
}

export default MicomponenteGridHome;
