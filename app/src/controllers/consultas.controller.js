const { pool } = require("../db.js");

const MAX_CONSULTAS = 3;
const TIEMPO_LIMITE = 5 * 60 * 1000; // 5 minutos en milisegundos

// Objeto para almacenar la última consulta de cada email
const ultimasConsultas = {};

exports.sendConsulta = async (req, res) => {
    const { nombre, email, telefono, consulta } = req.body;

    try {
        // Verificar si el email ha realizado más de MAX_CONSULTAS consultas en los últimos TIEMPO_LIMITE milisegundos
        if (ultimasConsultas[email] && ultimasConsultas[email].length >= MAX_CONSULTAS) {
            const tiempoActual = new Date().getTime();
            const consultasRecientes = ultimasConsultas[email].filter(consulta => tiempoActual - consulta < TIEMPO_LIMITE);

            if (consultasRecientes.length >= MAX_CONSULTAS) {
                return res.status(403).json({ message: 'Se han enviado muchas consultas, espere unos minutos antes de realizar su siguiente consulta.' });
            }
        }

        // Verificar si la consulta actual es igual a las últimas tres consultas
        const consultaRepetida = await pool.query('SELECT COUNT(*) AS count FROM consultas WHERE email = ? AND consulta = ? ORDER BY id DESC LIMIT 3', [email, consulta]);
        
        if (consultaRepetida[0].count >= MAX_CONSULTAS) {
            return res.status(400).json({ message: 'Se han realizado 3 consultas idénticas, no se puede realizar más.' });
        }

        // Insertar la nueva consulta en la base de datos
        await pool.query('INSERT INTO consultas (nombre, email, telefono, consulta) VALUES (?, ?, ?, ?)', [nombre, email, telefono, consulta]);

        // Actualizar las últimas consultas del email
        if (!ultimasConsultas[email]) {
            ultimasConsultas[email] = [];
        }
        ultimasConsultas[email].push(new Date().getTime());

        return res.status(200).json({ message: 'Consulta enviada exitosamente' });
    } catch (error) {
        console.error('Error al realizar la inserción de consulta:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.mostrarConsultas = async (req, res) => {
    try {
        // Realizar la consulta SELECT a la tabla "consultas"
        const resultadoConsulta = await pool.query('SELECT * FROM consultas');

        // Obtener los resultados de la consulta del objeto de resultado
        const consultas = resultadoConsulta[0];

        // Verificar si se obtuvieron resultados de la consulta
        if (consultas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron consultas' });
        }

        // Mapear los resultados para formatearlos como objetos
        const consultasFormateadas = consultas.map(consulta => ({
            id: consulta.id,
            nombre: consulta.nombre,
            email: consulta.email,
            telefono: consulta.telefono,
            consulta: consulta.consulta,
            observaciones: consulta.observaciones
        }));

        // Devolver los resultados de la consulta como respuesta
        return res.status(200).json({ consultas: consultasFormateadas });
    } catch (error) {
        console.error('Error al obtener las consultas:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.mostrarConsultasporId = async (req, res) => {
    const { id } = req.body;

    try {
        // Realizar la consulta SELECT a la tabla "consultas" filtrando por ID
        const resultadoConsulta = await pool.query('SELECT * FROM consultas WHERE id = ?', [id]);

        // Obtener los resultados de la consulta del objeto de resultado
        const consultas = resultadoConsulta[0];

        // Verificar si se obtuvieron resultados de la consulta
        if (consultas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron consultas con el ID proporcionado' });
        }

        // Mapear los resultados para formatearlos como objetos
        const consultasFormateadas = consultas.map(consulta => ({
            id: consulta.id,
            nombre: consulta.nombre,
            email: consulta.email,
            telefono: consulta.telefono,
            consulta: consulta.consulta,
            observaciones: consulta.observaciones
        }));

        // Devolver los resultados de la consulta como respuesta
        return res.status(200).json({ consultas: consultasFormateadas });
    } catch (error) {
        console.error('Error al obtener las consultas:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.updateconsultaporid = async (req, res) => {
    // Extraer el id, estadopedido y estapagado del cuerpo del request
    const { id, observaciones } = req.body;
  
    try {
      // Consulta para actualizar el pedido con el id proporcionado
      const [result] = await pool.query("UPDATE consultas SET observaciones = ? WHERE id = ?", [
        observaciones,
        id,
      ]);
  
      // Verificar si el pedido se actualizó correctamente
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "No se encontró ninguna observacion" });
      }
  
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: "Observacion actualizada correctamente" });
    } catch (error) {
      // Manejo de errores
      console.error("Error al actualizar el pedido:", error);
      return res.status(500).json({ message: "Error en el servidor al actualizar observacion" });
    }
};
