const { pool } = require("../db.js");

const index = (req, res) => res.json({ message: "welcome to my api ESTOY EN LA CONSTANTE INDEX" });

const ping = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT "pong" as result');
    res.json(result[0]);
  } catch (error) {
    console.error("Error al ejecutar la consulta 'ping':", error);
    res.status(500).json({ message: "Error en el servidor al realizar el ping" });
  }
};

module.exports = { index, ping };
