import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

import './css/ShowPedidos.css';

const ShowPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtroCodigo, setFiltroCodigo] = useState('');
  const [mostrarTodos, setMostrarTodos] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pedidosPerPage] = useState(100); // Número de pedidos por página
  const navigate = useNavigate(); // Obtiene la función de navegación




  
  useEffect(() => {
    const fetchPedidos = async () => {
      try {

        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/showallpedidos`);
        setPedidos(response.data.pedidos); // Establecer los pedidos obtenidos de la API
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);





  const indexOfLastPedido = currentPage * pedidosPerPage;
  const indexOfFirstPedido = indexOfLastPedido - pedidosPerPage;
  const currentPedidos = pedidos.slice(indexOfFirstPedido, indexOfLastPedido);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const filtrarPedidos = () => {
    return currentPedidos.filter((pedido) => {
      // Filtrar por código de pedido
      return mostrarTodos || pedido.codigopedido.includes(filtroCodigo);
    });
  };

  const handleCodigoChange = (event) => {
    setFiltroCodigo(event.target.value);
  };

  const handleMostrarTodosChange = (event) => {
    setMostrarTodos(event.target.checked);
  };

  const handleBuscarClick = () => {
    // Realizar la búsqueda filtrando por código de pedido
    const pedidosFiltrados = currentPedidos.filter((pedido) =>
      pedido.codigopedido.includes(filtroCodigo)
    );
    setPedidos(pedidosFiltrados);
  };

  return (
    <div className='pedidospage'>
      <h2>Lista de Pedidos</h2>

      <div className="filtrosedupedidobusqueda">

  {/* Agrega el botón "Mantenimiento" */}
  <Link to="/mantenimiento">
  <button className="mantenimientoButton">Volver a mantenimiento</button>
</Link>







        <input
          type="text"
          placeholder="Buscar por código de pedido"
          value={filtroCodigo}
          onChange={handleCodigoChange}
        />
        <button onClick={handleBuscarClick}>Buscar</button>
      </div>

    
      <table className='tableedupedidos'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Producto</th>
            <th>Cantidad</th>
            <th>Código de Pedido</th>
            <th>ID de Usuario</th>
            <th>Precio</th>

            <th>Pulgadas</th>
            <th>Color</th>
            <th>Almacenamiento</th>
            <th>Ram</th>
            <th>Procesador</th>




            <th>Estado del Pedido</th>
            <th>Estado de Pago</th>
            <th>Creado En</th>
            <th style={{width:'150px'}}>Editar</th>
          </tr>
        </thead>
        <tbody>
          {filtrarPedidos().map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.nombreproducto}</td>
              <td>{pedido.cantidad}</td>
              <td>{pedido.codigopedido}</td>
              <td>{pedido.user_id}</td>
              <td>{pedido.price}</td>

              <td>{pedido.pulgadas}</td>

              <td>{pedido.color}</td>

              <td>{pedido.almacenamiento}</td>

              <td>{pedido.ram}</td>

              <td>{pedido.procesador}</td>





              <td>{pedido.estadopedido}</td>
              <td>{pedido.estapagado}</td>
              <td>{pedido.creado_en}</td>
              <td>
                {/* Utiliza Link de React Router para redireccionar a la página de edición */}
                <Link to={`/pedidos/${pedido.id}`}>
                  <button className='editButton' style={{background:"black", color:"white"}}>Editar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {pedidos.length > 10 && (
        <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', marginBottom:"70px" }}>
          {Array.from({length: Math.ceil(pedidos.length / pedidosPerPage)}, (_, i) => i + 1)
            .map((number) => (
              <button
                key={number}
                style={{
                  background: 'black',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '30px',
                  margin: '5px'
                }}
                onClick={() => paginate(number)}
                className={number === currentPage ? 'active' : ''}
              >
                {number}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default ShowPedidos;
