import { useState, useEffect } from "react";
import axios from "axios";
import "./css/Trackingcss.css";

import "./css/checkoutForm.css";

import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

import "./css/fonts/fonts5144.css";

import "./css/Mostrador.css"; // Importar estilos CSS adicionales si es necesario

import { WhatsApp } from "@mui/icons-material";

const ShowPedidos = () => {
  const [showRecordar, setShowRecordar] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCodigo, setSelectedCodigo] = useState("");
  const [showCodigos, setShowCodigos] = useState(false);
  const [codigos, setCodigos] = useState([]);
  const [pagarMessage, setPagarMessage] = useState("");
  const [showPagarMessage, setShowPagarMessage] = useState(false);
  const [totalPorCodigo, setTotalPorCodigo] = useState({});

  const [numerodecedulasesion, setnumerodecedulasesion] = useState(false);




  const [idusuariodefinitivo, setidusuariodefinitivo] = useState(null);





  const handlenumerocedulaappear = () => {
    setnumerodecedulasesion(!numerodecedulasesion);
  };

  const [idrecibidoporcedula, setidrecibidoporcedula] = useState("");
  const [nombrerecibidoporcedula, setnombrerecibidoporcedula] = useState("");
  const [fallaloginporcedula, setfallaloginporcedula] = useState("");
  const [cedula, setCedula] = useState("");
  const [reloadPage, setReloadPage] = useState(false); // Estado para controlar recarga de página








  const handleSubmitcedula = async (event) => {
    event.preventDefault();

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(
        `${baseURL}/api/encuentrausuarioporcedula`,
        { cedula }
      );

      const { userNombre, userId } = response.data;

      setidrecibidoporcedula(userId);
      setnombrerecibidoporcedula(userNombre);

      localStorage.setItem("usersinregistro", userNombre);
      localStorage.setItem("idsinregistro", userId);

      // Establecer el estado para recargar la página
      setReloadPage(true);
    } catch (error) {
      setfallaloginporcedula("Error: No se pudo enviar el formulario");
      console.error("Error al enviar el formulario:", error);
    }
  };







  // useEffect para recargar la página cuando reloadPage cambie a true
  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);






  //hay que enviar un mensaje con el pedido (PARA PODER PAGAR EL PEDIDO SELECCIONADO)
  //nota: no es el cart




  







  const handlePagar = () => {
    let mensaje = `Buenos días, mi número de pedido es ${pedidos[0].codigopedido} y quisiera adquirir los siguientes productos:\n`;

    pedidos.forEach((pedido) => {
      mensaje += `${pedido.cantidad}\n`;
      mensaje += `${pedido.nombreproducto}\n`; // Añadir el título del producto al mensaje
      // Verificar y añadir detalles adicionales si existen
      if (pedido.color) {
        mensaje += `Color: ${pedido.color}\n`;
      }
      if (pedido.pulgadas) {
        mensaje += `Pulgadas: ${pedido.pulgadas}\n`;
      }
      if (pedido.memoria) {
        mensaje += `Memoria: ${pedido.memoria}\n`;
      }
      if (pedido.ram) {
        mensaje += `RAM: ${pedido.ram}\n`;
      }
      if (pedido.procesador) {
        mensaje += `Procesador: ${pedido.procesador}\n`;
      }
      if (pedido.price) {
        mensaje += `Precio: ${pedido.price} USD\n`;
      }

      mensaje += "\n"; // Separador entre productos
    });

    const numeroTelefono = import.meta.env.VITE_NUMERO_TELEFONO;
    const enlaceWhatsapp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(enlaceWhatsapp, "_blank");
  };







  useEffect(() => {


    // Verificar si 'idsinregistro' existe en el localStorage
    const idSinRegistro = localStorage.getItem("idsinregistro");
    
    // Si 'idsinregistro' no existe, obtener el valor de 'id' en su lugar
    const id = idSinRegistro ? idSinRegistro : localStorage.getItem("id");


    
    if (id) {

      setIsLoggedIn(true);

      obtenerValoresTotalesPorCodigo();


      setidusuariodefinitivo(id);






    }
  }, []);
  









  const obtenerValoresTotalesPorCodigo = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      const codigos = await axios.post(`${baseURL}/api/showcodigopedidoporid`, {
        id: idusuariodefinitivo,
      });

      const promises = codigos.data.codigopedidos.map(async (pedido) => {
        const baseURL = import.meta.env.VITE_API_BASE_URL;

        const totalResponse = await axios.post(
          `${baseURL}/api/showPreciototalporcodigopedido`,
          { codigo: pedido.codigopedido }
        );

        return {
          codigo: pedido.codigopedido,
          total: totalResponse.data.valorpedido[0].total,
        };
      });
      const resultados = await Promise.all(promises);
      const totalPorCodigoActualizado = {};
      resultados.forEach((resultado) => {
        totalPorCodigoActualizado[resultado.codigo] = resultado.total;
      });
      setTotalPorCodigo(totalPorCodigoActualizado);
    } catch (error) {
      setError("");
    }
  };

  useEffect(() => {
    calcularTotal();
  }, [selectedCodigo]);


  
  const handleObtenerCodigos = async () => {
    try {
      const id = idusuariodefinitivo;

      const baseURL = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.post(
        `${baseURL}/api/showcodigopedidoporid`,
        { id }
      );
      setCodigos(
        response.data.codigopedidos.map((pedido) => pedido.codigopedido)
      );
      setShowCodigos(true);
      setShowRecordar(!showRecordar);
    } catch (error) {
      setError("No existen pedidos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseURL}/api/showpedidos`, {
        codigopedido: selectedCodigo,
        id: idusuariodefinitivo,
      });
      setPedidos(response.data.pedidos);
      setShowPagarMessage(true);
    } catch (error) {
      setError("Selecciona un pedido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const handleSelectChange = (e) => {
    setSelectedCodigo(e.target.value);
  };

  const calcularTotal = () => {
    if (selectedCodigo && totalPorCodigo[selectedCodigo]) {
      setPagarMessage(
        `En caso de no haber realizado el pago por valor total de: $ ${totalPorCodigo[selectedCodigo]}, pude hacerlo mediante el siguiente link. ⬇️`
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        className="center-container"
        style={{ display: "flex", flexDirection: "column", minHeight: "300px" }}
      >
        <div className="message">
          <button
            style={{ borderRadius: "50px" }}
            onClick={handlenumerocedulaappear}
          >
            <div style={{ cursor: "pointer" }}>
              <PersonIcon sx={{ color: "#dde0e7", marginLeft: "10px" }} />
            </div>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.21053",
                fontWeight: 450,
                letterSpacing: "0em",
                fontFamily:
                  '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                color: "#f5f5f7",
                marginBottom: "10px",
                minWidth: "250px",
              }}
            >
              Login con Cedula
            </p>
          </button>
        </div>

        <div className="message">
          <button style={{ borderRadius: "50px" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div style={{ cursor: "pointer" }}>
                <PersonIcon sx={{ color: "#dde0e7", marginLeft: "10px" }} />
              </div>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.21053",
                  fontWeight: 450,
                  letterSpacing: "0em",
                  fontFamily:
                    '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                  color: "#f5f5f7",
                  marginBottom: "10px",
                  minWidth: "250px",
                }}
              >
                Login con Usuario
              </p>
            </Link>
          </button>
        </div>

        {numerodecedulasesion && (
          <form onSubmit={handleSubmitcedula} style={{ maxWidth: "400px" }}>
            <div className="busquedapedido2">
              <label className="codigopedilabel">
                <input
                  type="text"
                  placeholder="Introducir Cedula"
                  className="codigoinputt"
                  style={{
                    maxWidth: "180px",
                    minWidth: "180px",
                    marginTop: "40px",
                    borderRadius: "30px",
                  }}
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
              </label>

              <button
                type="submit"
                className="obtenerpedidos"
                style={{
                  fontSize: "16px",
                  lineHeight: "1.125",
                  fontWeight: 600,
                  letterSpacing: ".004em",
                  color: "white",
                  marginTop: "63px",
                  borderRadius: "30px",
                  background: "rgb(42, 104, 177)",
                  marginBottom: "30px",
                  
                }}
              >
                Acceder
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="center-container">
      <div>
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
          <div className="busquedapedido2">
            <label
              className="codigopedilabel"
              style={{
                fontSize: "17px",
                lineHeight: "1.125",
                fontWeight: 600,
                letterSpacing: ".004em",
                fontFamily:
                  '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                color: "white",
                marginBottom: "30px", // Añadir margen inferior al h2 para separarlo del siguiente elemento
              }}
            >
              <input
                type="text"
                placeholder="Código pedido"
                className="codigoinputt"
                value={selectedCodigo}
                onChange={handleSelectChange}
                list="codigos"
                style={{
                  maxWidth: "180px",
                  minWidth: "180px",
                  marginTop: "40px",
                  borderRadius: "30px", // Añadir margen inferior al h2 para separarlo del siguiente elemento
                }}
              />
            </label>
            <datalist id="codigos">
              {codigos.map((codigo, index) => (
                <option key={index} value={codigo} />
              ))}
            </datalist>
            <button
              type="submit"
              disabled={isLoading}
              className="obtenerpedidos"
              style={{
                fontSize: "16px",
                lineHeight: "1.125",
                fontWeight: 600,
                letterSpacing: ".004em",
                fontFamily:
                  '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                color: "white",
                marginTop: "50px",
                borderRadius: "30px",
                background: "rgb(42, 104, 177)",
                marginBottom: "30px",

                // Añadir margen inferior al h2 para separarlo del siguiente elemento
              }}
            >
              Buscar
            </button>
          </div>
        </form>

        <div className="botonesalapar">
          <button
            onClick={handleObtenerCodigos}
            className="obtenerpedidos"
            style={{
              fontSize: "14px",
              lineHeight: "1.125",
              fontWeight: 600,
              letterSpacing: ".004em",
              fontFamily:
                '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
              color: "black",
              marginBottom: "0px",
              borderRadius: "30px",
              background: "white",
              width: "250px",
            }}
          >
            Ver Pedidos realizados anteriormente
          </button>
        </div>

        {isLoading && <p>Cargando...</p>}

        {error && (
          <p
            style={{
              color: "white",
              borderRadius: "5px",
              padding: "10px",
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "15px",
              lineHeight: "1.125",
              fontWeight: 600,
              letterSpacing: ".004em",
              fontFamily:
                '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
            }}
          >
            {error}
          </p>
        )}

        {showCodigos && showRecordar && codigos.length > 0 && (
          <div className="recordatoriodepedidos">
            <div className="buscaCodigo">
              <select
                value={selectedCodigo}
                onChange={handleSelectChange}
                className="selecttt"
                style={{ width: "250px", padding: "15px", textAlign: "center" }}
              >
                <option value="">Seleccione su código</option>
                {codigos.map((codigo, index) => (
                  <option key={index} value={codigo}>
                    {codigo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {pedidos.length > 0 && (
          <div>
            {pedidos
              .reduce((chunks, pedido, index) => {
                const chunkIndex = Math.floor(index / 2);
                if (!chunks[chunkIndex]) {
                  chunks[chunkIndex] = [];
                }
                chunks[chunkIndex].push(pedido);
                return chunks;
              }, [])
              .map((chunk, chunkIndex) => (
                <table
                  key={chunkIndex}
                  style={{
                    minWidth: "310px",
                    maxWidth: "310px",
                    borderRadius: "15px",
                    background: "#f5f5f5",
                    marginTop: "20px",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ color: "black" }}>
                        Producto {chunkIndex * 2 + 1}
                      </th>
                      {/* Si la longitud de pedidos es impar y este es el último chunk,
                          entonces dejamos el último <th> en blanco */}
                      <th style={{ color: "black" }}>
                        {chunkIndex === Math.floor(pedidos.length / 2) &&
                        pedidos.length % 2 !== 0
                          ? null
                          : `Producto ${chunkIndex * 2 + 2}`}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderRadius: "20px" }}>
                      {chunk.map((pedido, index) => (
                        <td key={index}>
                          <div className="tablapedidoss">
                            <p className="tabla" style={{ minHeight: "140px" }}>
                              <b>Producto: </b>
                              <br />
                              {pedido.nombreproducto}
                              <br />{" "}
                              {/* Agregamos un <br> debajo de nombreproducto */}
                              {pedido.pulgadas && (
                                <>
                                  {pedido.pulgadas} Pulgadas
                                  <br />
                                </>
                              )}
                              {pedido.color && (
                                <>
                                  {pedido.color}
                                  <br />
                                </>
                              )}
                              {pedido.almacenamiento && (
                                <>
                                  {pedido.almacenamiento}
                                  <br />
                                </>
                              )}
                              {pedido.ram && (
                                <>
                                  {pedido.ram} RAM
                                  <br />
                                </>
                              )}
                              {pedido.procesador && (
                                <>
                                  {pedido.procesador}
                                  <br />
                                </>
                              )}
                            </p>

                            <p className="tabla">
                              <b>Cantidad: </b>
                              <br />
                              {pedido.cantidad}
                            </p>
                            <p className="tabla">
                              <b>Código:</b>
                              <br /> {pedido.codigopedido}
                            </p>
                            <p className="tabla">
                              <b>Precio:</b>
                              <br /> $ {pedido.price}
                            </p>
                            <p className="tabla">
                              <b>Subtotal:</b> ${" "}
                              {(pedido.price * pedido.cantidad).toFixed(2)}
                            </p>
                            <p className="envioono">
                              <b>
                                Envío: <br />
                              </b>
                              {pedido.estadopedido}
                            </p>
                            <p className="pagadoono">
                              <b>
                                Pago: <br />
                              </b>
                              {pedido.estapagado}
                            </p>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              ))}
          </div>
        )}

        {showPagarMessage && (
          <div className="checkoutFormm">
            <div className="response-message-container">
              <div
                className="totaltotal"
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  marginTop: "20px",
                  display: "flex",
                  gap: "5px",
                  fontSize: "19px",
                  lineHeight: "1.21053",
                  fontWeight: 400,
                  letterSpacing: "0em",
                  fontFamily:
                    '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                  flexDirection: "column",
                }}
              >
                <div
                  className="response-message"
                  style={{ marginTop: "50px", fontSize: "15px" }}
                >
                  En caso de no haber realizado el pago aun por valor total de{" "}
                  {pedidos
                    .reduce((total, pedido) => {
                      return total + pedido.price * pedido.cantidad;
                    }, 0)
                    .toFixed(2)}
                  $, podrá hacerlo mediante el siguiente enlace{" "}
                </div>

                <button
                  style={{
                    background: "green",
                    color: "white",
                    marginTop: "15px",
                  }}
                  onClick={handlePagar}
                >
                  Pago WhatsApp <WhatsApp />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowPedidos;
