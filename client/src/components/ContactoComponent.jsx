import { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './css/LegalInfo.css';

function ContactoComponent() {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [respuestaServidor, setRespuestaServidor] = useState('');
  const [cargando, setCargando] = useState(false);

  const enviarFormulario = async (valores, { resetForm }) => {
    setCargando(true);

    try {
      // Escapar caracteres especiales en los campos
      const { nombre, email, telefono, consulta } = valores;
      const sanitizedNombre = nombre.replace(/[/'";/?\\]/g, '');
      const sanitizedEmail = email.replace(/[/'";/?\\]/g, '');
      const sanitizedTelefono = telefono.replace(/[/'";/?\\]/g, '');
      const sanitizedConsulta = consulta.replace(/[/'";/?\\]/g, '');


      const baseURL = import.meta.env.VITE_API_BASE_URL;

      // Realizar la petición POST
      await axios.post(`${baseURL}/api/consulta`, {
        nombre: sanitizedNombre,
        email: sanitizedEmail,
        telefono: sanitizedTelefono,
        consulta: sanitizedConsulta
      });

      // Mostrar mensaje de éxito
      cambiarFormularioEnviado(true);
      setTimeout(() => cambiarFormularioEnviado(false), 5000); // Ocultar el mensaje después de 10 segundos
    } catch (error) {
      console.error('Error al enviar el formulario:', error.response.data.message);
      setRespuestaServidor(error.response.data.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex',
    justifyContent: 'center', marginTop:'40px' }}>
      <Formik
        initialValues={{
          nombre: '',
          email: '',
          telefono: '',
          consulta: ''
        }}
        validate={(valores) => {
          let errores = {};

          // Validación de nombre
          if (!valores.nombre) {
            errores.nombre = 'Por favor, ingresa tu nombre';
          }

          // Validación de email
          if (!valores.email) {
            errores.email = 'Por favor, ingresa tu correo electrónico';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.email)) {
            errores.email = 'Por favor, ingresa un correo electrónico válido';
          }

          // Validación de teléfono
          if (!valores.telefono) {
            errores.telefono = 'Por favor, ingresa tu número de teléfono';
          } else if (!/^\d{10}$/.test(valores.telefono)) {
            errores.telefono = 'Por favor, ingresa un número de teléfono válido';
          }

          // Validación de consulta
          if (!valores.consulta) {
            errores.consulta = 'Por favor, ingresa tu consulta';
          }

          return errores;
        }}
        onSubmit={(valores, formikBag) => enviarFormulario(valores, formikBag)}
      >
        {({ errors }) => (
          <Form className="formulario" style={{ backgroundColor: 'rgb(255 255 255)', padding: '20px', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 5px 0px', display:'flex', alignItems:'center'}}>
            <h6 style={{ color: '#2d2e33', fontSize: '20px', marginBottom: '30px', justifyContent: 'center', display: 'flex' }}>Contacto</h6>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Escribe tu nombre"
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '30px', boxSizing: 'border-box' }}
              />
              <ErrorMessage name="nombre" component={() => (<div className="error">{errors.nombre}</div>)} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Escribe tu email"
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '30px', boxSizing: 'border-box' }}
              />
              <ErrorMessage name="email" component={() => (<div className="error">{errors.email}</div>)} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="telefono">Teléfono</label>
              <Field
                type="text"
                id="telefono"
                name="telefono"
                placeholder="Escribe tu teléfono"
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '30px', boxSizing: 'border-box' }}
              />
              <ErrorMessage name="telefono" component={() => (<div className="error">{errors.telefono}</div>)} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="consulta">Consulta</label>
              <Field
                as="textarea"
                id="consulta"
                name="consulta"
                placeholder="Escribe tu consulta"
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '10px', boxSizing: 'border-box', minHeight: '100px' }}
              />
              <ErrorMessage name="consulta" component={() => (<div className="error">{errors.consulta}</div>)} />
            </div>

            <button type="submit" style={{ width: '100%', padding: '10px', background: 'linear-gradient(to bottom, #38389d, #306ba7)', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', maxWidth: '150px' , marginTop: '50px'}} disabled={cargando}>
              {cargando ? (
                <>
                  <i className="fa fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>Loading
                </>
              ) : (
                'Enviar'
              )}
            </button>
            <div style={{ marginTop: '1rem' }}>
              {respuestaServidor && <p style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{respuestaServidor}</p>}
            </div>
            {formularioEnviado && (
              <div style={{ backgroundColor: 'green', color: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', marginTop: '1rem' }}>
                Hemos recibido su consulta, nos pondremos en contacto con usted.
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ContactoComponent;
