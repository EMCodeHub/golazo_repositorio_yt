import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./css/ShowPedidos.css";

const ShowUsuarioyPedidos = () => {
  const [usersWithPedido, setUsersWithPedido] = useState([]);
  const [filtroCodigo, setFiltroCodigo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pedidosPerPage] = useState(10); // Número de pedidos por página

  useEffect(() => {
    const fetchUsersWithPedido = async () => {
      try {

        const baseURL = import.meta.env.VITE_API_BASE_URL;

        const response = await axios.get(
          `${baseURL}/api/showtablausuarioconcodigopedido`
        );
        setUsersWithPedido(response.data.pedidos);
      } catch (error) {
        console.error("Error al obtener los usuarios con pedidos:", error);
      }
    };

    fetchUsersWithPedido();
  }, []);

  const indexOfLastPedido = currentPage * pedidosPerPage;
  const indexOfFirstPedido = indexOfLastPedido - pedidosPerPage;
  const currentPedidos = usersWithPedido.slice(
    indexOfFirstPedido,
    indexOfLastPedido
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filtrarPedidos = () => {
    return currentPedidos.filter((pedido) => {
      // Filtrar por código de pedido
      return pedido.codigopedido.includes(filtroCodigo);
    });
  };

  const handleCodigoChange = (event) => {
    setFiltroCodigo(event.target.value);
  };

  const handleBuscarClick = () => {
    // Realizar la búsqueda filtrando por código de pedido
    const pedidosFiltrados = usersWithPedido.filter((pedido) =>
      pedido.codigopedido.includes(filtroCodigo)
    );
    setUsersWithPedido(pedidosFiltrados);
  };

  return (
    <div className="pedidospage">
      {/* Agrega el botón "Mantenimiento" */}

      <h2>Lista de Usuarios con Pedidos</h2>

      <div className="filtrosedupedidobusqueda">
        <Link to="/mantenimiento">
          <button className="mantenimientoButton">
            Volver a mantenimiento
          </button>
        </Link>
        <input
          type="text"
          placeholder="Buscar por código de pedido"
          value={filtroCodigo}
          onChange={handleCodigoChange}
        />
        <button onClick={handleBuscarClick}>Buscar</button>
      </div>

      <table className="tableedupedidos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Username</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Código Postal</th>
            <th>Celular</th>
            <th>Email</th>
            <th>Código de Pedido</th>
          </tr>
        </thead>
        <tbody>
          {filtrarPedidos().map((user, index) => (
            <tr key={index}>
              <td>{user.nombre}</td>
              <td>{user.apellidos}</td>
              <td>{user.username}</td>
              <td>{user.direccion}</td>
              <td>{user.ciudad}</td>
              <td>{user.codigopostal}</td>
              <td>{user.celular}</td>
              <td>{user.email}</td>
              <td>{user.codigopedido}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {usersWithPedido.length > 10 && (
        <div
          className="pagination-container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {Array.from(
            { length: Math.ceil(usersWithPedido.length / pedidosPerPage) },
            (_, i) => i + 1
          ).map((number) => (
            <button
              key={number}
              style={{
                background: "black",
                color: "white",
                padding: "10px",
                borderRadius: "30px",
                margin: "5px",
              }}
              onClick={() => paginate(number)}
              className={number === currentPage ? "active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowUsuarioyPedidos;
