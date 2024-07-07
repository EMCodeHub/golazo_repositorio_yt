// este componente es la ficha individual de nuestro producto

import "./css/ProductDescription.css"; // Importar el archivo CSS para estilos personalizados
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//Ya que este componente encesita añadir y elimnar del carrito el producto, traemos useCart

import { useCart } from "../hooks/useCart.js";
import { Rating } from "@mui/material";
import ShareFacebookButton from "./ShareFacebookButton.jsx";
import { FaWhatsapp } from "react-icons/fa";
import "./css/fonts/fonts5144.css"; // Fuente de apple
import "./css/Mostrador.css"; // traemos los estilos del boton de apple
import DescriptionProductGallery from "./DescriptionProductGallery.jsx";
import { Camion } from "./svgNavbar";
import axios from "axios";


export default function ProductDescription({parameternavigate, producto}) {


  const product = producto; 

  const parameter = parameternavigate;


  const navigate = useNavigate();



  const [isMagnifierVisible, setMagnifierVisible] = useState(false);



 // PULGADAS

 
 const pulgadasArray = [product.pospulg1, product.pospulg2];

 // COLOR
 const colorArray = [
   product.poscolor1,
   product.poscolor2,
   product.poscolor3,
   product.poscolor4,
 ];

 // MEMORIA
 const memoriaArray = [
   product.posmem1,
   product.posmem2,
   product.posmem3,
   product.posmem4,
 ];

 // PROCESADOR
 const procesadorArray = [product.posproces1, product.posproces2];

 // RAM
 const ramArray = [
   product.posram1,
   product.posram2,
   product.posram3,
   product.posram4,
 ];



 const colorNames = {
  blanco: "white",
  negro: "black",
  gris: "gray",
  rojo: "red",
  azul: "blue",
  verde: "green",
  amarillo: "yellow",
  naranja: "orange",
  morado: "purple",
  rosa: "pink",
  marrón: "brown",
  turquesa: "turquoise",
  beige: "beige",
  cian: "cyan",
  magenta: "magenta",
  lima: "limegreen",
  marino: "navyblue",
  oliva: "olive",
  aguamarina: "aquamarine",
  violeta: "violet"
};


  const {
    cart,
    addToCart,
    removeFromCart,
    changeColor,
    changePulgadas,
    changeMemory,
    changeRam,
    changeProces,
    changePrice,
  } = useCart(); //addtocart, removefromcart, son las acciones principales en este componente




  const [selectedPulgadasOption, setSelectedPulgadasOption] = useState(null);

  const [selectedColorOption, setSelectedColorOption] = useState(null);

  const [selectedMemoriaOption, setSelectedMemoriaOption] = useState(null);

  const [selectedProcesadorOption, setSelectedProcesadorOption] = useState(null);

  const [selectedRamOption, setSelectedRamOption] = useState(null);

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const [mensajeValidacion, setMensajeValidacion] = useState(null);

  /*------------------------*/

  const [gamapulgadas, setgamapulgadas] = useState(null);

  const [gamamemoria, setgamamemoria] = useState(null);

  const [gamaram, setgamaram] = useState(null);

  /*------------------------*/

  const [preciofinalproductoacordeagama, setpreciofinalproductoacordeagama] =
    useState(product.price);

  const isProductInCart = cart.some((item) => item.id === product.id);

  // Estado para controlar si el producto ha sido añadido al carrito

  const titlebotonesRef = useRef(null);




  useEffect(() => {

    console.log('carga el componente por primera vez');

    estableceGama();
  
}, []);



  useEffect(() => {

    console.log('estan cambiando las dependencias  selectedPulgadasOption selectedColorOption selectedMemoriaOption selectedProcesadorOptio selectedRamOption');

        estableceGama();
      
  }, [
  
    selectedPulgadasOption,
    selectedColorOption,
    selectedMemoriaOption,
    selectedProcesadorOption,
    selectedRamOption,
  ]);




  useEffect(() => {
    const isProductInCart = cart.some((item) => item.id === product.id);
    setIsAddedToCart(isProductInCart);
  }, [
    cart,
    product.id,
    selectedPulgadasOption,
    selectedColorOption,
    selectedMemoriaOption,
    selectedProcesadorOption,
    selectedRamOption,
  ]);





  //esta función es para navegar cuando se haga clic en VOLVER.

  const handleNavigateBack = () => {

    if (parameter === "/") {
      const currentUrl = window.location.href;
      const urlParts = currentUrl.split("/");
      const newUrl = urlParts.slice(0, -2).join("/");
      window.location.href = newUrl;
    } else if (parameter === "/shop") {
      let category = "";


      switch (product.category) {

        case 'Smartphones':
          category = "Smartphones";
          break;
        case 'Laptops':
          category = "Laptops";
          break;
        case 'Televisores':
          category = "Televisores";
          break;
        case 'Tablets':
          category = "Tablets";
          break;
        case 'Videojuegos':
          category = "Videojuegos";
          break;
        default:
          // Manejar otros casos aquí si es necesario
          break;
      }

      if (category !== "") {
        navigate("/shop", { state: { category } });
      }

    } else {
      // Manejar otros casos aquí si es necesario
    }
  };
  




const handleAddToCart = () => {

  
    if (validarTodosLosCampos()) {
   
      if (!isAddedToCart) {

        // Solo agregar al carrito si el producto no está presente
        addToCart(product);
        changePulgadas(product.id, selectedPulgadasOption);
        changeColor(product.id, selectedColorOption);
        changeMemory(product.id, selectedMemoriaOption);
        changeRam(product.id, selectedRamOption);
        changeProces(product.id, selectedProcesadorOption);
        changePrice(product.id, preciofinalproductoacordeagama);
      }
      setIsAddedToCart(true); // Marcar como añadido al carrito
    } else {
      
      
      // Mostrar mensaje de validación y limpiar después de 3 segundos
      const mensajeValidacion =
        "Por favor, complete la selección de características de su producto";
      setMensajeValidacion(mensajeValidacion);
      setTimeout(() => {
        setMensajeValidacion(null);
      }, 3000);

    }

  };




  const handlerRamChange = (newRam) => {
    setSelectedRamOption(newRam);
  };

  const handleProcesadorChange = (newProcesador) => {
    setSelectedProcesadorOption(newProcesador);
  };

  const handleChangePulgadas = (newPulgadas) => {
    setSelectedPulgadasOption(newPulgadas);
  };

  const handleColorChange = (newColor) => {
    setSelectedColorOption(newColor);
  };

  const handleMemoryChange = (newMemory) => {
    setSelectedMemoriaOption(newMemory);
  };




  const preciogama1producto = product.preciogama1;
  const preciogama2producto = product.preciogama2;
  const preciogama3producto = product.preciogama3;
  const preciogama4producto = product.preciogama4;



  const verificaGamaProducto = () => {

    let gamaPulgadas;
    let gamaMemoria;
    let gamaRam;


    if (product.category === "Smartphones") {


      gamaPulgadas = selectedPulgadasOption ? (parseInt(selectedPulgadasOption) < 15 ? 1 : 2):1 ;
      gamaMemoria = selectedMemoriaOption ? (parseInt(selectedMemoriaOption) < 260 ? 1 : 2):1;


  } else if (product.category === "Laptops") {


      gamaPulgadas = selectedPulgadasOption ? (parseInt(selectedPulgadasOption) < 17 ? 1 : 2) : 1 ;
      gamaMemoria = selectedMemoriaOption ? (parseInt(selectedMemoriaOption) < 750 ? 1 : 2) :1 ;
      gamaRam = selectedRamOption ? (parseInt(selectedRamOption) < 9 ? 1 : 2) : 1 ;


  } else if (product.category === "Televisores") {

      gamaPulgadas = selectedPulgadasOption ?  (parseInt(selectedPulgadasOption) < 45 ? 1 : 2) : 1;

  }
  
    setgamapulgadas(gamaPulgadas);
    setgamamemoria(gamaMemoria);
    setgamaram(gamaRam);


    // Devolver un valor único basado en las gamas seleccionadas

    if (product.category === "Smartphones") {

   
      if (gamaPulgadas === 1 && gamaMemoria === 1) return 1;

      if (gamaPulgadas === 2 && gamaMemoria === 1) return 2;
      
      if (gamaPulgadas === 1 && gamaMemoria === 2) return 3;

      if (gamaPulgadas === 2 && gamaMemoria === 2) return 4;


      console.log(gamaPulgadas);

      console.log(gamaMemoria);


    } 
    
    

    else if (product.category === "Televisores") {

    return gamaPulgadas === 1 ? 1 : 2;


    } else if (product.category === "Laptops") {

    

      if (gamaPulgadas === 1 && gamaMemoria === 1 && gamaRam === 1) return 1;
      if (gamaPulgadas === 2 && gamaMemoria === 1 && gamaRam === 1) return 2;
      if (gamaPulgadas === 1 && gamaMemoria === 2 && gamaRam === 1) return 3;
      if (gamaPulgadas === 2 && gamaMemoria === 2 && gamaRam === 1) return 3;
      if (gamaPulgadas === 1 && gamaMemoria === 1 && gamaRam === 2) return 2;
      if (gamaPulgadas === 2 && gamaMemoria === 1 && gamaRam === 2) return 3;
      if (gamaPulgadas === 1 && gamaMemoria === 2 && gamaRam === 2) return 4;
      if (gamaPulgadas === 2 && gamaMemoria === 2 && gamaRam === 2) return 4;
    }
  };



  const estableceGama = () => {

    if (verificaGamaProducto() === 1) {
      setpreciofinalproductoacordeagama(preciogama1producto);
    }

    if (verificaGamaProducto() === 2) {
      setpreciofinalproductoacordeagama(preciogama2producto);
    }

    if (verificaGamaProducto() === 3) {
      setpreciofinalproductoacordeagama(preciogama3producto);
    }

    if (verificaGamaProducto() === 4) {
      setpreciofinalproductoacordeagama(preciogama4producto);
    }
  };

 

function sonNulosOStringVacios(array) {
  return array.every(
    (elemento) => elemento === null || elemento === "" || elemento.trim() === ""
  );
}


const validarCampo = (array, selectedOption) => {
  if (sonNulosOStringVacios(array) && selectedOption === null) {
    return true;
  } else if (!sonNulosOStringVacios(array) && selectedOption === null) {
    return false;
  } else if (!sonNulosOStringVacios(array) && selectedOption === "") {
    return false;
  }
  return true;
};


const validarTodosLosCampos = () => {
  return (
    validarCampo(pulgadasArray, selectedPulgadasOption) &&
    validarCampo(colorArray, selectedColorOption) &&
    validarCampo(memoriaArray, selectedMemoriaOption) &&
    validarCampo(ramArray, selectedRamOption) &&
    validarCampo(procesadorArray, selectedProcesadorOption)
  );
}


  return (
    <div className="product-description-container">
      <div className="product-description">
        <div className="botonesw">
          <p
            className="parrafo-descriptionhome1"
            onClick={handleNavigateBack}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            ref={titlebotonesRef}
          >
            {"<"} Volver
          </p>
        </div>

        <div className="titledescription">
          <h2 className="h2-descriptionhome1">{product.title}</h2>
        </div>

        <div className="image-container">
          <DescriptionProductGallery product = {product}/>
        </div>

        <div className="leyendaDescription">

          {/* <Rating
            name="read-only"
            value={parseInt(product.rating)}
            readOnly
            sx={{ marginBottom: "20px" }}
          />
  */}

          <div>
            <p
              className="parrafo-descriptionhome2"
              style={{ marginTop: "20px" }}
            >
              Disponibles {product.stock} unidades{" "}
            </p>
          </div>

          <div className="titledescription">
            <p className="parrafo-price">
              $
              {preciofinalproductoacordeagama !== null
                ? `${preciofinalproductoacordeagama}`
                : `${product.price}`}
            </p>

            <p className="parrafo-descriptionhome2">{product.description}</p>


            {/* Opciones de Pulgadas */}

            {pulgadasArray.some(
              (pulgada) => pulgada !== null && pulgada !== ""
            ) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  justifyItems: "center",
                  alignContent: "center",
                  flexDirection: "column",
                  marginBottom: "40px",
                  fontSize: "14px",
                  lineHeight: "1.125",
                  fontWeight: 400,
                  letterSpacing: ".004em",
                  fontFamily:
                    '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                }}
              >
                <p className="tituloscaracteristicasproducto">
                  ¿Qué tamaño necesitas?
                </p>

                {pulgadasArray
                  .filter((pulgada) => pulgada !== null && pulgada !== "") // Filtrar los valores nulos del array
                  .map((pulgada) => (
                    <div
                      key={pulgada}
                      style={{
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "315px",
                        height: "80px",
                        marginBottom: "20px",
                        border:
                          selectedPulgadasOption === pulgada
                            ? "2px solid blue"
                            : "solid 1px black",
                        fontSize: "14px",
                        lineHeight: "1.125",
                        fontWeight: 400,
                        letterSpacing: ".004em",
                        fontFamily:
                          '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                      }}
                      onClick={() => handleChangePulgadas(pulgada)}
                    >
                      {pulgada} Pulgadas
                    </div>
                  ))}
              </div>
            )}


            {/* Opciones de Color */}


            {colorArray.some((color) => color !== null && color !== "") && (
              <div>
                <p className="tituloscaracteristicasproducto">
                  ¿Color favorito?
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    flexWrap: "wrap", // Añadir envoltura para nuevas filas
                    marginBottom: "40px",
                    gap: "15px",
                    fontSize: "14px",
                    lineHeight: "1.125",
                    fontWeight: 400,
                    letterSpacing: ".004em",
                    fontFamily:
                      '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                  }}
                >
                  {colorArray
                    .filter((color) => color !== null && color !== "") // Filtrar los valores nulos del array
                    .map((color) => (
                      <div
                        key={color}
                        style={{
                          borderRadius: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "150px",
                          height: "80px",
                          marginBottom: "20px",
                          border:
                            selectedColorOption === color
                              ? "2px solid blue"
                              : "solid 1px black",
                        }}
                        onClick={() => handleColorChange(color)}
                      >
                        <div
                          style={{
                            width: "20px", // Ancho del círculo
                            height: "20px", // Alto del círculo
                            borderRadius: "50%", // Para hacerlo circular
                            backgroundColor: colorNames[color], // Color del círculo
                            marginRight: "10px", // Espacio entre el círculo y el texto
                          }}
                        />

                        {color}
                      </div>
                    ))}
                </div>
              </div>
            )}



            {/* Opciones de Procesador */}


            {procesadorArray.some(
              (procesador) => procesador !== null && procesador !== ""
            ) && (
              <div>
                <p className="tituloscaracteristicasproducto">
                  Elige procesador
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    flexWrap: "wrap", // Añadir envoltura para nuevas filas
                    marginBottom: "40px",
                    gap: "15px",
                    fontSize: "14px",
                    lineHeight: "1.125",
                    fontWeight: 400,
                    letterSpacing: ".004em",
                    fontFamily:
                      '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                  }}
                >
                  {procesadorArray
                    .filter(
                      (procesador) => procesador !== null && procesador !== ""
                    ) // Filtrar los valores nulos del array
                    .map((procesador) => (
                      <div
                        key={procesador}
                        style={{
                          borderRadius: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "150px",
                          height: "80px",
                          marginBottom: "20px",
                          border:
                            selectedProcesadorOption === procesador
                              ? "2px solid blue"
                              : "solid 1px black",
                        }}
                        onClick={() => handleProcesadorChange(procesador)}
                      >
                        {procesador}
                      </div>
                    ))}
                </div>
              </div>
            )}



            {/* Opciones de RAM */}



            {ramArray.some((ram) => ram !== null && ram !== "") && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginBottom: "40px",
                  fontSize: "14px",
                  lineHeight: "1.125",
                  fontWeight: 400,
                  letterSpacing: ".004em",
                  fontFamily:
                    '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                }}
              >
                <p className="tituloscaracteristicasproducto">¿Memoria Ram?</p>

                {ramArray
                  .filter((ram) => ram !== null && ram !== "") // Filtrar los valores nulos del array
                  .reduce((rows, ram, index) => {
                    if (index % 2 === 0) rows.push([]);
                    rows[rows.length - 1].push(
                      <div
                        key={ram}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "20px",

                          width: "150px",
                          height: "80px",
                          marginBottom: "15px",
                          border:
                            selectedRamOption === ram
                              ? "2px solid blue"
                              : "solid 1px black",
                        }}
                        onClick={() => handlerRamChange(ram)}
                      >
                        {ram} GB
                      </div>
                    );
                    return rows;
                  }, [])
                  .map((row, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                        marginBottom: index === 0 ? "15px" : "0px",
                      }}
                    >
                      {row}
                    </div>
                  ))}
              </div>
            )}



            {/* Opciones de Memoria */}


            {memoriaArray.some(
              (memoria) => memoria !== null && memoria !== ""
            ) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginBottom: "0px",
                  fontSize: "14px",
                  lineHeight: "1.125",
                  fontWeight: 400,
                  letterSpacing: ".004em",
                  fontFamily:
                    '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                }}
              >
                <p className="tituloscaracteristicasproducto">
                  {" "}
                  ¿Que almacenamiento necesitas?
                </p>

                {memoriaArray
                  .filter((memoria) => memoria !== null && memoria !== "") // Filtrar los valores nulos del array
                  .reduce((rows, memoria, index) => {
                    if (index % 2 === 0) rows.push([]);
                    rows[rows.length - 1].push(
                      <div
                        key={memoria}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "20px",

                          width: "150px",
                          height: "80px",
                          marginBottom: "15px",
                          border:
                            selectedMemoriaOption === memoria
                              ? "2px solid blue"
                              : "solid 1px black",
                        }}
                        onClick={() => handleMemoryChange(memoria)}
                      >
                        {memoria} GB
                      </div>
                    );
                    return rows;
                  }, [])
                  .map((row, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                        marginBottom: index === 0 ? "15px" : "0px",
                      }}
                    >
                      {row}
                    </div>
                  ))}
              </div>
            )}





            {mensajeValidacion && (
              <div
                style={{
                  marginTop: "35px",
                  height: "50px",
                  borderRadius: "30px",
                  backgroundColor: "rgb(165 152 152)",
                  color: "white",
                  padding: "5px",
                  paddingLeft: "20px",
                  maxWidth: "290px",
                }}
                className="botonescomprarycompartir"
              >
                {mensajeValidacion}
              </div>
            )}



            <div
              className="botonescomprarycompartir"
              style={{ marginTop: "35px" }}
            >
              <button
                className="buttonApple2"
                onClick={() => {
                  handleAddToCart();
                }}
                style={{
                  maxHeight: "40px",
                  Width: "110px",
                  maxWidth: "180px",
                  minWidth: "110px",
                }}
              >
                {isProductInCart ? "Añadido a la bolsa" : "Comprar"}
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >


              <Camion />{" "}
              <p style={{ marginTop: "20px", marginLeft: "10px" }}>
                Envío gratuito{" "}
              </p>
            </div>


            {/*

          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <ShareFacebookButton />
           </div>
            */}



          </div>
        </div>
      </div>
    </div>
  );
}
