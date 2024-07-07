const { pool } = require("../db.js");

exports.getProducts = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM products ORDER BY createAt ASC");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM products WHERE id = ?", [req.params.id]);

    if (result.length === 0)
      return res.status(404).json({ message: "Product not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const requiredFields = [
      'title', 'description', 'price', 'stock', 'brand', 'category', 'thumbnail', 'imagen1',
      'imagen2', 'masvendido', 'imagenhome', 'descriptionhome', 'visiblehome', 'pospulg1', 'pospulg2',
      'poscolor1', 'poscolor2', 'poscolor3', 'poscolor4', 'posmem1', 'posmem2', 'posmem3', 'posmem4',
      'posproces1', 'posproces2', 'posram1', 'posram2', 'posram3', 'posram4'
    ];

    for (const field of requiredFields) {
      if (!(field in req.body)) {
        return res.status(400).json({ message: `El campo ${field} es obligatorio.` });
      }
    }

    const numericFields = ['price', 'stock'];
    for (const field of numericFields) {
      if (isNaN(req.body[field])) {
        return res.status(400).json({ message: `El campo ${field} debe ser un número.` });
      }
    }

    if (parseFloat(req.body.price) <= 0) {
      return res.status(400).json({ message: 'El precio debe ser un número positivo.' });
    }

    if (parseInt(req.body.stock) <= 0 || !Number.isInteger(parseFloat(req.body.stock))) {
      return res.status(400).json({ message: 'El stock debe ser un número entero positivo.' });
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const createAt = `${year}-${month}-${day}`;

    const [result] = await pool.query(`
      INSERT INTO products(title, description, price, stock, brand, category, thumbnail, imagen1,
      imagen2, masvendido, imagenhome, descriptionhome, visiblehome, pospulg1, pospulg2,
      poscolor1, poscolor2, poscolor3, poscolor4, posmem1, posmem2, posmem3, posmem4,
      posproces1, posproces2, posram1, posram2, posram3, posram4, createAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      req.body.title, req.body.description, req.body.price, req.body.stock, req.body.brand,
      req.body.category, req.body.thumbnail, req.body.imagen1, req.body.imagen2, req.body.masvendido,
      req.body.imagenhome, req.body.descriptionhome, req.body.visiblehome, req.body.pospulg1,
      req.body.pospulg2, req.body.poscolor1, req.body.poscolor2, req.body.poscolor3, req.body.poscolor4,
      req.body.posmem1, req.body.posmem2, req.body.posmem3, req.body.posmem4, req.body.posproces1,
      req.body.posproces2, req.body.posram1, req.body.posram2, req.body.posram3, req.body.posram4,
      createAt
    ]);

    res.json({
      id: result.insertId,
      ...req.body,
      createAt,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Ocurrió un error interno en el servidor.', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    delete req.body.createAt;

    const result = await pool.query("UPDATE products SET ? WHERE id = ?", [req.body, req.params.id]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
