import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


import { Link} from 'react-router-dom'; // Importa useNavigate

import './css/EditPedidos.css';


const EditPedidos = () => {
  const { id } = useParams(); // Obtener el ID del pedido de los parámetros de la URL
  const [pedido, setPedido] = useState(null); // Estado para almacenar el objeto de pedido
  const [estadoPedido, setEstadoPedido] = useState('');
  const [estadoPago, setEstadoPago] = useState('');

  useEffect(() => {
    const fetchPedidoPorId = async () => {
      try {


        const baseURL = import.meta.env.VITE_API_BASE_URL;

        const response = await axios.post(`${baseURL}/api/showpedidosporid`, { id });
        setPedido(response.data.pedidos[0]); // Guardar el objeto de pedido en el estado
        setEstadoPedido(response.data.pedidos[0].estadopedido); // Guardar el estado del pedido
        setEstadoPago(response.data.pedidos[0].estapagado); // Guardar el estado de pago
      } catch (error) {
        console.error('Error al obtener el pedido por ID:', error);
      }
    };

    fetchPedidoPorId();
  }, [id]); // Ejecutar efecto cada vez que cambie el ID del pedido

  const handleEstadoPedidoChange = (event) => {
    setEstadoPedido(event.target.value);
  };

  const handleEstadoPagoChange = (event) => {
    setEstadoPago(event.target.value);
  };

  const handleActualizarPedido = async () => {
    try {

      const baseURL = import.meta.env.VITE_API_BASE_URL;

      await axios.put(`${baseURL}/api/updatepedidosporid`, {
        id,
        estadopedido: estadoPedido,
        estapagado: estadoPago
      });
      alert('Pedido actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
      alert('Error al actualizar el pedido');
    }
  };

  return (
    <div className='tablaedupedidoindividual'>


  {/* Agrega el botón "Mantenimiento" */}
  <Link to="/pedidos">
  <button className="mantenimientoButton">Volver</button>
</Link>


      <h2>Pedido ID: {id}</h2>
      {pedido ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Producto</th>
              <th>Cantidad</th>
              <th>Código de Pedido</th>
              <th>ID de Usuario</th>
              <th>Precio</th>
              <th style={{minWidth:"120px"}}>Estado del Pedido</th>
              <th style={{minWidth:"120px"}}>Estado de Pago</th>
              <th>Creado En</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{pedido.id}</td>
              <td>{pedido.nombreproducto}</td>
              <td>{pedido.cantidad}</td>
              <td>{pedido.codigopedido}</td>
              <td>{pedido.user_id}</td>
              <td>{pedido.price}</td>
              <td>
                <input
                  type='text'
                  value={estadoPedido}
                  onChange={handleEstadoPedidoChange}
                  style={{minWidth:"120px"}}
                />
              </td>
              <td>
                <input
                  type='text'
                  value={estadoPago}
                  onChange={handleEstadoPagoChange}
                  style={{minWidth:"120px"}}
                />
              </td>
              <td>{pedido.creado_en}</td>
              <td>
                <button onClick={handleActualizarPedido}>Actualizar</button>
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

export default EditPedidos;
