import './css/FormularioLogin.css';  


import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";



import {Ojosintachar, Ojotachado} from "./svgNavbar";

// Función de escape para evitar inyección de SQL y caracteres especiales
function escapeInput(input) {
  return input.replace(/[/'";/?\\]/g, ""); // Escapar comillas simples, dobles, barras, punto y coma y diagonal invertida
}

// Función de validación para caracteres especiales
function validateInput(input) {
  const pattern = /^[a-zA-Z0-9@._]+$/; // Permitir letras, números, @, . y _
  return pattern.test(input);
}

const RegisterForm = () => {

  const navigate = useNavigate();


  const handleLoginNavigate = () =>{


    navigate('/login');

  }




  const Botonojo = ({ onClick }) => (
    <button type="button" onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', marginLeft:"-10px" }}>
      <Ojosintachar width="40" height="40" />
    </button>
  );



  const Botonojotachado = ({ onClick }) => (
    <button type="button" onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', marginLeft:"-10px"}}>
      <Ojotachado width="40" height="40" />
    </button>
  );











  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [respuestaServidor, setRespuestaServidor] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarCodigoSeguridad, setMostrarCodigoSeguridad] = useState(false); // Estado para controlar la visibilidad del input de código de seguridad
  const [codigoSeguridad, setCodigoSeguridad] = useState(null); // Estado para almacenar el código de seguridad recibido de la API
  const [verificado, setVerificado] = useState(false); // Estado para verificar si el usuario ha sido verificado
  const [llamadaApiRealizada, setLlamadaApiRealizada] = useState(false); // Estado para controlar si la llamada a la API ya se ha realizado
  const [valoresFormulario, setValoresFormulario] = useState(null); // Estado para almacenar los valores del formulario
  const [mostrarPassword, setMostrarPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  // Estado para almacenar el mensaje de respuesta de la API de registro
  const [respuestaRegistro, setRespuestaRegistro] = useState("");

  // Estado para almacenar el mensaje de respuesta de la API de validación de usuario
  const [respuestaValidacionUsuario, setRespuestaValidacionUsuario] =
    useState("");

 

  // Mantener el estado de codigoSeguridad incluso después de que el componente se vuelva a montar
  useEffect(() => {
    // Verificar si codigoSeguridad es null y si ya se ha realizado la llamada a la API
    if (codigoSeguridad === null && llamadaApiRealizada) {
      // Realizar la petición POST para obtener el código de seguridad

      const baseURL = import.meta.env.VITE_API_BASE_URL;


      axios
        .post(`${baseURL}/api/register`, valoresFormulario)
        .then((response) => {
          const data = response.data;
          setCodigoSeguridad(data.securityCode);
          console.log("Código de seguridad recibido:", data.securityCode);
        })
        .catch((error) => {
          console.error("Error al obtener el código de seguridad:", error);
        });
    }
  }, [codigoSeguridad, llamadaApiRealizada, valoresFormulario]); // Ejecutar este efecto cada vez que codigoSeguridad, llamadaApiRealizada o valoresFormulario cambien

  const enviarFormulario = async (valores, { resetForm }) => {
    setCargando(true);

    try {
      // Escapar caracteres especiales en la contraseña
      valores.password = escapeInput(valores.password);

      // Realizar la petición POST solo si la llamada a la API no se ha realizado previamente
      if (!llamadaApiRealizada) {

        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.post(
          `${baseURL}/api/register`,
          valores
        );

        const data = response.data;

        setRespuestaRegistro(data.message);

        if (response.status !== 200) {
          setRespuestaServidor("Error en el servidor");
          console.log(
            "Estoy dentro de la respuesta positiva de mi API en la primera llamada y a continuación te muestro el valor del formulario username:"
          );
          console.log(valores.username);
          return;
        }

        console.log("Respuesta del servidor:", data);

        // Almacenar el código de seguridad en el estado del componente
        setCodigoSeguridad(data.securityCode);

        console.log("Código de seguridad recibido:", data.securityCode);

        // Marcar la llamada a la API como realizada
        setLlamadaApiRealizada(true);

        // Almacenar los valores del formulario en el estado
        setValoresFormulario(valores);
      }
    } catch (error) {
      console.error(
        "Error al enviar el formulario:",
        error.response.data.message
      );
      setRespuestaServidor(error.response.data.message);

      setRespuestaRegistro(error.response.data.message);
    } finally {
      setCargando(false);
      cambiarFormularioEnviado(true);
      setRespuestaServidor(
        "Le hemos enviado un email para verificar su usuario."
      );
      setMostrarCodigoSeguridad(true); // Mostrar el campo del código de seguridad después de enviar el formulario

      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => {
        setRespuestaServidor("");
      }, 1000000);
    }
  };

  const confirmarCodigo = (username, securityCode) => {

    console.log(username);
    console.log(securityCode);
    console.log(codigoSeguridad);

    if (codigoSeguridad) {
      console.log("existe codigoSeguridad");

      if (securityCode == codigoSeguridad) {

        const baseURL = import.meta.env.VITE_API_BASE_URL;


        axios
          .put(`${baseURL}/api/validaruser`, { username })
          .then((response) => {
            console.log("Usuario validado:", response.data);

            setRespuestaValidacionUsuario(response.data.message);
            setVerificado(true);

          })
          .catch((error) => {
            console.error(
              "Error al validar el usuario:",
              error.response.data.message
            );

            setRespuestaValidacionUsuario(error.response.data.message);

          });
      } else {
        console.error("Código de seguridad incorrecto");
      }
    } else {
      console.error("Código de seguridad no definido o no es del tipo string");
    }
  };

  return (


    <div style={{ maxWidth: '350px', margin: '0 auto'}}>

      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "", // Nuevo campo para confirmar la contraseña
        }}
        validate={(valores) => {
          let errores = {};

          // Validación password
          if (!valores.password) {
            errores.password = "Ingresa una contraseña";
          } else if (valores.password.length < 8) {
            errores.password = "La contraseña debe tener al menos 8 caracteres";
          } else if (!/[A-Z]/.test(valores.password)) {
            errores.password =
              "La contraseña debe contener al menos una letra mayúscula";
          } else if (!/\d/.test(valores.password)) {
            errores.password = "La contraseña debe contener al menos un número";
          } else if (/\s/.test(valores.password)) {
            errores.password =
              "La contraseña no puede contener espacios en blanco";
          } else if (/[/'";/?\\]/.test(valores.password)) {
            errores.password =
              "La contraseña no puede contener caracteres especiales";
          }

          // Validación de coincidencia de contraseñas
          if (valores.password !== valores.confirmPassword) {
            errores.confirmPassword = "Las contraseñas no coinciden";
          }

          // Validación username
          if (!valores.username) {
            errores.username = "Ingresa un nombre de usuario";
          } else if (/\s/.test(valores.username)) {
            errores.username =
              "El usuario no puede contener espacios en blanco";
          } else if (!validateInput(valores.username)) {
            errores.username =
              "El nombre de usuario no puede contener caracteres especiales, excepto @, . y _";
          }

          return errores;
        }}
        onSubmit={(valores, formikBag) => {
          enviarFormulario(valores, formikBag);
        }}
      >
        {({ errors }) => (
          <Form
            className="formulario"
            style={{
              backgroundColor: "rgb(255 255 255)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 5px 0px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <h6
              style={{
                color: "#2d2e33",
                fontSize: "20px",
                marginBottom: "30px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              Registrarse
            </h6>
            <div style={{ marginBottom: "15px", width: "100%" , maxWidth:"230px"}}>
              <label htmlFor="username">Email</label>
              <Field
                type="email"
                id="username"
                name="username"
                placeholder="Su email/usuario"
                style={{ borderRadius: "30px" }}
              />
              <ErrorMessage
                name="username"
                component={() => <div className="error">{errors.username}</div>}
              />
            </div>

            <div style={{ marginBottom: "15px", width: "100%",maxWidth:"230px"}}>
              <label htmlFor="password">Contraseña nueva</label>




              <div style={{display:"flex", flexDirection:"row"}}>

              <Field
                type={mostrarPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Su contraseña"
                //style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '30px', boxSizing: 'border-box' }}

                style={{ 
                  width: '250px',
                  padding: '10px', 
                  border: '1px solid #ccc', 
                  borderRadius: '30px', 
                  boxSizing: 'border-box',
                  marginLeft:"0px",
                }}
              />


   {  !mostrarPassword ? (

              <Botonojotachado  onClick={() => setMostrarPassword(!mostrarPassword)} />


              ) : (  <Botonojo onClick={() => setMostrarPassword(!mostrarPassword)} />)


            }
              
              </div>




              <ErrorMessage
                name="password"
                component={() => <div className="error">{errors.password}</div>}
              />
            </div>



            <div style={{ marginBottom: "15px", width: "100%", maxWidth:"230px" }}>
              <label htmlFor="confirmPassword">Repita su contraseña</label>


              <div style={{display:"flex", flexDirection:"row"}}>

              <Field
                type={mostrarPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Su contraseña"
                //style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '30px', boxSizing: 'border-box' }}

                style={{ 
                  width: '250px',
                  padding: '10px', 
                  border: '1px solid #ccc', 
                  borderRadius: '30px', 
                  boxSizing: 'border-box',
                  marginLeft:"0px",
                }}
              />


   {  !mostrarPassword ? (

              <Botonojotachado  onClick={() => setMostrarPassword(!mostrarPassword)} />


              ) : (  <Botonojo onClick={() => setMostrarPassword(!mostrarPassword)} />)


            }
              
              </div>


              <ErrorMessage
                name="confirmPassword"
                component={() => (
                  <div className="error">{errors.confirmPassword}</div>
                )}
              />
            </div>






           





            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                minWidth: "180px",
              }}
            >




              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "linear-gradient(to bottom, #38389d, #306ba7)",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  cursor: "pointer",
                  maxWidth: "150px",
                  marginTop: "50px",
                }}
                disabled={cargando || llamadaApiRealizada}
              >
                {cargando ? (
                  <div>
                    <i
                      className="fa fa-spinner fa-spin"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Loading
                  </div>
                ) : (
                  "Enviar"
                )}
              </button>




          





              
  







            </div>




            <button
              
            style={{
              width: "100%",
              padding: "10px",
              background: "white",
              color: "black",
             
              borderRadius: "30px",
              cursor: "pointer",
              maxWidth: "150px",
              border: 'solid 1px',
             
            }}

            onClick={handleLoginNavigate}
           
          >
            Volver a Login
          </button>
















          </Form>
        )}
      </Formik>

      {/*
      {respuestaRegistro && (
        <div
          style={{
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            padding: "10px",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          {respuestaRegistro}
        </div>
      )}

        */}

   


      {mostrarCodigoSeguridad && (
        <Formik
          initialValues={{
            securityCode: "", // Nuevo campo para el código de seguridad
          }}
          validate={(valores) => {
            let errores = {};

            // Validación del código de seguridad
            if (!valores.securityCode) {
              errores.securityCode = "Por favor ingresa el código de seguridad";
            }

            return errores;
          }}
          onSubmit={(valores) =>
            confirmarCodigo(valoresFormulario.username, valores.securityCode)
          } // Pasar username y securityCode como argumentos
        >
          {({ errors }) => (
            <Form className="formulario">



            <div  style={{ marginTop: "1rem", display:"flex", justifyContent:"center", alignContent:"center"}}>
            {respuestaServidor && (
              <div
                style={{
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "5px",
                  padding: "10px",
                  textAlign: "center",
                  marginTop: "0px",
                  width:"250px",
                }}
                className='formulario'
              >
                {respuestaServidor}
              </div>
            )}
          </div>


      




              <div style={{ marginBottom: "15px", width: "100%" }}>
                <label htmlFor="securityCode">Código de seguridad</label>
                <Field
                  type="text"
                  id="securityCode"
                  name="securityCode"
                  placeholder="Código de seguridad"
                  style={{ borderRadius: "30px" }}
                />
                <ErrorMessage
                  name="securityCode"
                  component={() => (
                    <div className="error">{errors.securityCode}</div>
                  )}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "linear-gradient(to bottom, #38389d, #306ba7)",
                    color: "white",
                    border: "none",
                    borderRadius: "30px",
                    cursor: "pointer",
                    maxWidth: "150px",
                    marginTop: "50px",
                    display: verificado ? "none" : "block",
                  }}
                >
                  Validar Código
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {respuestaValidacionUsuario && (
        
        

        <div style={{ marginTop: "1rem", display:"flex", justifyContent:"center", alignContent:"center"}}>
        <div
        className='formulario'
          style={{
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            textAlign: "center",
            marginTop: "1rem",
            width: "250px",
          }}
        >
          {respuestaValidacionUsuario}
        </div>

        </div>

      )}

  




      <div style={{ textAlign: "center", marginTop: "1rem" }}>




      </div>


    </div>
  );
};

export default RegisterForm;
