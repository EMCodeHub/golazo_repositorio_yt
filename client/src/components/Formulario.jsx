import './css/FormularioLogin.css';


import { useState, useContext } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserProvider/UserContext';


import {Ojosintachar, Ojotachado} from "./svgNavbar";


function escapeInput(input) {
  return input.replace(/['";]/g, '');
}



const Formulario = () => {

const navigate = useNavigate();

const handleRegistrarse =() =>{

  navigate('/register');

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
  const [respuestaServidor, setRespuestaServidor] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);


  
  const { setIsAdminState } = useContext(UserContext);

  const enviarFormulario = async (valores, { resetForm }) => {


    setCargando(true);

    try {


      const sanitizedUsername = escapeInput(valores.email.trim());
      const sanitizedPassword = escapeInput(valores.password.trim());

      const baseURL = import.meta.env.VITE_API_BASE_URL;
      
      const response = await axios.post(`${baseURL}/api/login`, {

        username: sanitizedUsername,
        password: sanitizedPassword

      });



      const { token, message, user, id } = response.data;


      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      localStorage.setItem('id', id);
      localStorage.setItem('message', message);


      if (response.status !== 200) {
        setRespuestaServidor('Credenciales incorrectas');
        return;
      }


      try {

          navigateAfterLogin(message);
       
      } catch (error) {
        console.error('Error al verificar el token:', error.message);
        setRespuestaServidor('Clave secreta incorrecta o token no válido');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error.response.data.message);
      setRespuestaServidor(error.response.data.message);
    } finally {
      setCargando(false);
      cambiarFormularioEnviado(true);
      setTimeout(() => {
        cambiarFormularioEnviado(false);
        setRespuestaServidor('');
      }, 2000);
    }
  };



  const navigateAfterLogin = (message) => {
    if (message === 'admin') {
      setIsAdminState(true);
      setTimeout(() => {
        navigate('/mantenimiento');
      }, 500); // Esperar 2 segundos antes de redirigir
    } else if (message === 'cliente') {
      setTimeout(() => {
        navigate('/carrito');
      }, 500); // Esperar 2 segundos antes de redirigir
    } else {
      setTimeout(() => {
        setRespuestaServidor('Rol desconocido');
      }, 500); // Esperar 2 segundos antes de mostrar el mensaje
    }
  };
  

  

  return (


    <div style={{ maxWidth: '350px', margin: '0 auto'}}>


      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validate={(valores) => {
          let errores = {};

          if (!valores.password) {
            errores.password = 'Ingrese su clave';
          }

          if (!valores.email) {
            errores.email = 'Ingrese su email';
          } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
            errores.email = 'Introduce un email correcto';
          }

          return errores;
        }}
        onSubmit={(valores, formikBag) => enviarFormulario(valores, formikBag)}
      >
        {({ errors }) => (
          <Form className="formulario" style={{ backgroundColor: 'rgb(255 255 255)', padding: '20px', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 5px 0px', display:'flex', alignItems:'center'}}>
            <h6 style={{ color: '#2d2e33', fontSize:'20px', marginBottom:"30px", justifyContent:"center", display:'flex' }}>Login</h6>





<div style={{width:'280px'}}>


            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email" style={{marginLeft:"20px",}}>Email</label>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="Su email"
                style={{ width: '230px', padding: '10px', border: '1px solid #ccc', borderRadius: '30px', boxSizing: 'border-box' , marginLeft:"20px"}}
              />
              <ErrorMessage name="email" component={() => (<div className="error" style={{marginLeft:"20px",}}>{errors.email}</div>)} />
            </div>





            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password" style={{marginLeft:"20px",}}>Contraseña</label>



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
                  marginLeft:"20px",
                }}
              />


   {  !mostrarPassword ? (

              <Botonojotachado  onClick={() => setMostrarPassword(!mostrarPassword)} />


              ) : (  <Botonojo onClick={() => setMostrarPassword(!mostrarPassword)} />)


            }
              
              </div>




              <ErrorMessage name="password" component={() => (<div className="error" style={{marginLeft:"20px",}}>{errors.password}</div>)} />

         
            </div>




            </div>









            <p style={{
              fontSize: '13px',
              lineHeight: '1.21053',
              fontWeight: 400,
              letterSpacing: '0em',
              fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
              color: "#2f2424",
              marginBottom: "5px", 
              marginLeft: '0px',
            }}>
              <Link to="/recordatorio" style={{
                fontSize: '13px',
                lineHeight: '1.21053',
                fontWeight: 800,
                letterSpacing: '0em',
                fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                color: "black",
                marginBottom: "5px"
              }}><strong style={{
                fontSize: '13px',
                lineHeight: '1.21053',
                fontWeight: 800,
                letterSpacing: '0em',
                fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                color: "#5976cb",
                marginBottom: "5px",
              }}>Olvidó su clave?</strong></Link>
            </p>


            <div style={{ marginTop: '1rem' }}>
            {respuestaServidor && (
              <div style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px', padding: '10px', textAlign: 'center' }}>
                {respuestaServidor}
              </div>
            )}
          </div>




        

            <button type="submit" style={{ width: '100%', padding: '10px', background: 'linear-gradient(to bottom, #38389d, #306ba7)', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', maxWidth:"150px", marginBottom:'30px'}} disabled={cargando}>
              {cargando ? (
                <div>
                  <i className="fa fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>Loading
                </div>
              ) : (
                'Login'
              )}
            </button>


      
            <button    style={{
              width: "100%",
              padding: "10px",
              background: "white",
              color: "black",
             
              borderRadius: "30px",
              cursor: "pointer",
              maxWidth: "150px",
              border: 'solid 1px',
             
            }} onClick={handleRegistrarse}>
           
            
           Registrarse
        
           
          </button>



        



          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Formulario;
