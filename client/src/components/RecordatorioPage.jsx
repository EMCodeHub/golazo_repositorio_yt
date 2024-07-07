
import { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useNavigate, Link } from 'react-router-dom';





const RecordarClaveForm = () => {



const navigate = useNavigate();



  const handleLogin =() =>{

    navigate('/login');
  
  }
  


  const [respuestaServidor, setRespuestaServidor] = useState('');
  const [cargando, setCargando] = useState(false);

  const enviarFormulario = async (valores) => {
    setCargando(true);
    try {

      const baseURL = import.meta.env.VITE_API_BASE_URL;
      
      const response = await axios.post(`${baseURL}/api/recordarusuario`, { username: valores.username });
      const data = response.data;

      // Simulamos un retardo para mostrar la respuesta después de 2 segundos
      setTimeout(() => {
        setCargando(false);
        if (response.status === 200) {
          // Mostrar mensaje especial si la respuesta es positiva
          setRespuestaServidor('Le hemos enviado un email para recordar su clave.');
        } else {
          setRespuestaServidor(data.password);
        }



      }, 2000);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setRespuestaServidor('Usuario no encontrado');
      setCargando(false);
    }
  };

  return (



    <div style={{ maxWidth: '350px', margin: '0 auto'}}>



      <Formik
        initialValues={{
          username: ''
        }}
        onSubmit={(valores) => enviarFormulario(valores)}
      >
        {({ errors }) => (
          <Form className="formulario" style={{ backgroundColor: 'rgb(255 255 255)', padding: '20px', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 5px 0px', display:'flex', alignItems:'center'}}>
            <div style={{ marginBottom: '15px' }}>
              <h6 style={{ color: '#2d2e33', fontSize: '20px', marginBottom: '30px', justifyContent: 'center', display: 'flex' }}>Recordar Clave</h6>
              <label htmlFor="username">Email</label>
              <Field
                type="email"
                id="username"
                name="username"
                placeholder="Escribe el email/usuario"
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '30px', boxSizing: 'border-box' }}
              />
              <ErrorMessage name="username" component={() => (<div className="error">{errors.username}</div>)} />
            </div>

            <button type="submit" style={{ width: '100%', padding: '10px', background: 'linear-gradient(to bottom, #38389d, #306ba7)', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', maxWidth: "150px", marginTop: "50px", marginBottom:'20px' }} disabled={cargando}>
              {cargando ? (
                <>
                  <i className="fa fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>Loading
                </>
              ) : (
                'Enviar'
              )}
            </button>


            

            {respuestaServidor && respuestaServidor === "Usuario no encontrado" ? (
              <div style={{ backgroundColor: '#9f0000', color: 'white', borderRadius: '5px', padding: '10px', textAlign: 'center', marginTop: '1rem' }}>
                {respuestaServidor}
              </div>
            ) : respuestaServidor ? (
              <div style={{ backgroundColor: '#5cb85c', color: 'white', borderRadius: '5px', padding: '10px', textAlign: 'center', marginTop: '1rem' }}>
                {respuestaServidor}
              </div>
            ) : null}





            {cargando && <p style={{ textAlign: 'center', marginTop: '1rem' }}>Esperando respuesta del servidor...</p>}



            <div style={{ textAlign: 'center', }}>



         
            <button    style={{
              width: "100%",
              padding: "10px",
              background: "white",
              color: "black",
              borderRadius: "30px",
              cursor: "pointer",
              maxWidth: "150px",
              border: 'solid 1px', 
              marginRight: '65px',    
            }} onClick={handleLogin}>
           
            
           Ir a Login
        
           
          </button>
            




          </div>





    






          </Form>
        )}
      </Formik>

   

    </div>
  );
}

export default RecordarClaveForm;
