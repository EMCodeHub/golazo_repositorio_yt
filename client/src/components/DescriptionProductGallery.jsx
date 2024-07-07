import { useState, useEffect } from "react";
import "./css/Slideshow.css"; // Importa tu archivo CSS
import axios from "axios"; // Importar Axios
import { useLocation } from "react-router-dom";

const lupaSVG =
  'data:image/svg+xml;base64,' +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-1 -1 18 18" fill="none" stroke="#fff" stroke-width=".7"><path d="M15.707 13.293L13 10.586C13.63 9.536 14 8.311 14 7C14 3.14 10.859 0 7 0C3.141 0 0 3.14 0 7C0 10.86 3.141 14 7 14C8.312 14 9.536 13.631 10.586 13L13.293 15.707C13.488 15.902 13.744 16 14 16C14.256 16 14.512 15.902 14.707 15.707L15.707 14.707C16.098 14.316 16.098 13.684 15.707 13.293ZM7 12C4.239 12 2 9.761 2 7C2 4.239 4.239 2 7 2C9.761 2 12 4.239 12 7C12 9.761 9.761 12 7 12Z" fill="#333"/></svg>`
  );

function Slideshow({product}) {


  const producto = product;


  const title = producto.title;
  
  
  const [imagenes, setImagenes] = useState([]);


  const [imagen1, setImagen1] = useState("");
  const [imagen2, setImagen2] = useState("");
  const [imagen3, setImagen3] = useState("");



  const [initialLoad, setInitialLoad] = useState(true); // Bandera para controlar la carga inicial



  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (!producto) {
          console.error("El objeto product es undefined o null");
          return;
        }

        if (!producto.title) {
          console.error("El título del producto es undefined o null");
          return;
        }

        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.post(
          `${baseURL}/api/obtenerImagenesParaGaleriaProducto3`,
          { title }
        );
        setImagenes(response.data.imagenes);

        const firstImage = response.data.imagenes[0];
        if (firstImage) {
          setImagen1(firstImage.thumbnail);
          setImagen2(firstImage.imagen1);
          setImagen3(firstImage.imagen2);
        }
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      }
    };

    fetchImages();
  }, [producto, title]);

  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  const showSlides = (n) => {
    let newIndex = n;

    if (n > 3) {
      newIndex = 1;
    } else if (n < 1) {
      newIndex = 3;
    }

    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Si es la carga inicial, simplemente muestra la diapositiva sin efecto
    if (initialLoad) {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = i === newIndex - 1 ? "block" : "none";
      }
      setInitialLoad(false); // Cambia la bandera para futuros clics
      setSlideIndex(newIndex); // Actualiza el índice de la diapositiva actual
      return;
    }

    // Si no es la carga inicial, aplica el efecto de transición
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.animation = "fadeOut 0.5s forwards";
    }

    setTimeout(() => {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[newIndex - 1].style.display = "block";
      slides[newIndex - 1].style.animation = "fadeIn 0.2s forwards";
    }, 200);

    // Actualiza el índice de la diapositiva actual
    setSlideIndex(newIndex);
  };

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  useEffect(() => {
    showSlides(1);
  }, []);

  const [zoomLevel, setZoomLevel] = useState(1);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;
    const xPercent = offsetX / width;
    const yPercent = offsetY / height;
    setZoomLevel(2); // puedes ajustar este valor según tu preferencia
    e.target.style.transformOrigin = `${xPercent * 100}% ${yPercent * 100}%`;
  };

  const handleMouseLeave = () => {
    setZoomLevel(1);
  };

  return (


    <div className="slideshow-container" style={{ width: "230px"}}>
      <div
        className="mySlides fade"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
       
      >
        <img
          src={imagen1}
          style={{
            width: "100%",
            transform: `scale(${zoomLevel})`,
            cursor: `url(${lupaSVG}), pointer`,
          }}
          alt="Slide 1"
        />
      </div>
      <div
        className="mySlides fade"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >




     { imagen2 != ""  &&  (<img

          src={imagen2}
          style={{
            width: "100%",
            transform: `scale(${zoomLevel})`,
            cursor: `url(${lupaSVG}), pointer`,
          }}
          alt="Slide 2"
        />

        )}



      </div>
      <div
        className="mySlides fade"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >



  { imagen3 != ""  &&  (

        <img
          src={imagen3}
          style={{
            width: "100%",
            transform: `scale(${zoomLevel})`,
            cursor: `url(${lupaSVG}), pointer`,
          }}
          alt="Slide 3"
        />

      )}

      </div>



   

<div style={{ display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end'}}>

      <div style={{ textAlign: "center", marginTop: "30px"}}>


        <span className="dot" onClick={() => currentSlide(1)}></span>

        { imagen2 != ""  &&  (

        <span className="dot" onClick={() => currentSlide(2)}></span>

      )}

      { imagen3 != ""  &&  (
        <span className="dot" onClick={() => currentSlide(3)}></span>

      )}

      </div>

      </div>





    </div>
  );
}

export default Slideshow;
