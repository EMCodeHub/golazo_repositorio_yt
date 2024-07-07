import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Mostrarconsultas.css';
import { Link } from 'react-router-dom'; // Importa useNavigate

const MostrarConsultas = () => {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/mostrarConsultas`);
        setConsultas(response.data.consultas); // Establecer las consultas obtenidas de la API
      } catch (error) {
        console.error('Error al obtener las consultas:', error);
      }
    };

    fetchConsultas();
  }, []);

  const handleActualizarClick = async (id) => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const consultaToUpdate = consultas.find(consulta => consulta.id === id);
      await axios.put(`${baseURL}/api/actualizarConsulta/${id}`, { observaciones: consultaToUpdate.observaciones });
      alert('Consulta actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar la consulta:', error);
      alert('Error al actualizar la consulta. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className='todoconsultasedu'>

      {/* Agrega el botón "Mantenimiento" */}
      <Link to="/mantenimiento">
        <button className="mantenimientoButton">Volver a mantenimiento</button>
      </Link>

      <h2>Consultas</h2>
      <table className='tableedupedidos'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Consulta</th>
            <th>Observaciones</th>
            <th>Acciones</th> {/* Columna para las acciones */}
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.id}>
              <td>{consulta.id}</td>
              <td>{consulta.nombre}</td>
              <td>{consulta.email}</td>
              <td>{consulta.telefono}</td>
              <td>{consulta.consulta}</td>
              <td>{consulta.observaciones}</td>
              <td>




            <Link to={`/consultas/${consulta.id}`}>
                <button
                  style={{ backgroundColor: 'black', color: 'white', padding: '4px' }}
                
                >
                  Editar
                </button>

                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarConsultas;
