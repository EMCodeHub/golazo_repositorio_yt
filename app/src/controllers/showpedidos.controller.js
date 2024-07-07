const { pool } = require("../db.js");

exports.showpedidos = async (req, res) => {
  const { codigopedido, id } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM pedidos WHERE codigopedido = ? AND user_id = ?",
      [codigopedido, id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({
        message: "No se encontraron productos para el codigopedido y usuario especificados",
      });
    }

    res.status(200).json({ pedidos: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};









exports.showcodigopedidosporid = async (req, res) => {

  
  const { id } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT distinct codigopedido FROM pedidos WHERE user_id = ? ;",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron codigos de pedido para este id" });
    }

    res.status(200).json({ codigopedidos: rows });
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    return res.status(500).json({
      message: "Error en el servidor al obtener los codidos de los pedidos",
    });
  }
};















exports.showPreciototalporcodigopedido = async (req, res) => {
  const { codigo } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT SUM(price * cantidad) AS total FROM pedidos WHERE codigopedido = ?",
      [codigo]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se pudo realizar la suma total" });
    }

    res.status(200).json({ valorpedido: rows });
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    return res.status(500).json({ message: "Error en el servidor al intentar hacer la suma" });
  }
};

exports.showallpedidos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pedidos");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron pedidos" });
    }

    res.status(200).json({ pedidos: rows });
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los pedidos" });
  }
};

exports.showpedidosporid = async (req, res) => {
  const { id } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM pedidos WHERE id = ? ", [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos para el id indicado" });
    }

    res.status(200).json({ pedidos: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

exports.updatepedidosporid = async (req, res) => {
  const { id, estadopedido, estapagado } = req.body;

  try {
    const [result] = await pool.query("UPDATE pedidos SET estadopedido = ?, estapagado = ? WHERE id = ?", [
      estadopedido,
      estapagado,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró ningún pedido con el ID proporcionado" });
    }

    res.status(200).json({ message: "Pedido actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    return res.status(500).json({ message: "Error en el servidor al actualizar el pedido" });
  }
};

exports.showtablausuarioconcodigopedido = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
          u.nombre,
          u.apellidos,
          u.username,
          u.direccion,
          u.ciudad,
          u.codigopostal,
          u.celular,
          u.email,
          p.codigopedido
      FROM
          users u
      INNER JOIN
          pedidos p ON u.id = p.user_id
    `);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron registros en la tabla pedidos" });
    }

    res.status(200).json({ pedidos: rows });
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los registros" });
  }
};

exports.pedidossinregistro = async (req, res) => {
  try {
    const { title } = req.body;

    console.log(title);

    const fechaSolicitud = new Date().toISOString().substring(0, 10);

    await pool.query("INSERT INTO pedidossinregistro (nombre_producto, fecha_solicitud) VALUES (?, ?)", [
      title,
      fechaSolicitud,
    ]);

    res.status(200).json({ message: 'Pedido registrado correctamente' });
  } catch (error) {
    console.error('Error al insertar el pedido:', error);
    res.status(500).json({ message: 'Ocurrió un error al procesar el pedido' });
  }
};
