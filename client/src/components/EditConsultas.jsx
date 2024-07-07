import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';



const EditConsultas = () => {
  const { id } = useParams(); // Obtener el ID del consulta de los parámetros de la URL

  const [consulta, setConsulta] = useState(null); // Estado para almacenar el objeto de consulta
  const [estadoObservacion, setEstadoObservacion] = useState('');

  useEffect(() => {
    const fetchconsultaPorId = async () => {
      try {

        const baseURL = import.meta.env.VITE_API_BASE_URL;

        const response = await axios.post(`${baseURL}/api/mostrarConsultasporId`, { id });
        setConsulta(response.data.consultas[0]); 
        setEstadoObservacion(response.data.consultas[0].observaciones);
      } catch (error) {
        console.error('Error al obtener el consulta por ID:', error);
      }
    };

    fetchconsultaPorId();
  }, [id]); // Ejecutar efecto cada vez que cambie el ID del consulta

  const handleEstadoObservacionChange = (event) => {
    setEstadoObservacion(event.target.value);
  };

  const handleActualizarConsulta = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      await axios.put(`${baseURL}/api/updateconsultaporid`, {
        id,
        observaciones: estadoObservacion
      });
      alert('Consulta actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar el consulta:', error);
      alert('Error al actualizar el consulta');
    }
  };

  return (
    <div className='tablaeduconsultaindividual'>
      {/* Agrega el botón "Volver" */}
      <Link to="/consultas">
        <button className="mantenimientoButton">Volver</button>
      </Link>
      <h2>Consulta ID: {id}</h2>
      {consulta ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Consulta</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{consulta.id}</td>
              <td>{consulta.nombre}</td>
              <td>{consulta.email}</td>
              <td>{consulta.telefono}</td>
              <td>{consulta.consulta}</td>
              <td>
                <input
                  type='text'
                  value={estadoObservacion}
                  onChange={handleEstadoObservacionChange}
                  style={{ minWidth: "120px" }}
                />
              </td>
              <td>
                <button onClick={handleActualizarConsulta}>Actualizar</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default EditConsultas;
