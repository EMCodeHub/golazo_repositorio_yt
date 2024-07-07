const { pool } = require("../db.js");

module.exports.showProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

module.exports.searchProducts = async (req, res) => {
  try {
    const search = req.query.search || '';
    const [rows] = await pool.query("SELECT * FROM products WHERE title LIKE ?", [`%${search}%`]);
    const numberOfProducts = rows.length;

    if (numberOfProducts <= 0) {
      return res.status(404).json({ message: "⚠️No se encontraron productos" });
    }

    const message = `Productos encontrados (${numberOfProducts})`;

    res.status(200).json({ products: rows, message });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

module.exports.showMainProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = 1");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};








module.exports.showMasVendidosCelulares = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE category='Smartphones'  and masvendido = '1' ");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};












module.exports.showMasVendidosLaptops = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE category='Laptops'  and masvendido = '1' ");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

module.exports.showTelevisoresmasvendidos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE category = 'Televisores' and masvendido = '1' ");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

module.exports.showSmartphones = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE category = 'smartphones' ");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

module.exports.showLaptops = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE category = 'laptops' ");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

module.exports.showTelevisores = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE category = 'televisor' ");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

module.exports.showSmartphonesCarousel = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE category = 'smartphones' and visiblehome = '1' ");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

module.exports.showLaptopsCarousel = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE category = 'laptops' and visiblehome = '1'  ");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

module.exports.showTelevisoresCarousel = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE category = 'Televisores' and visiblehome = '1' ");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos" });
  }
};

module.exports.showCategorias = async (req, res) => {
  try {
    const query = "SELECT DISTINCT category FROM products";
    const [results] = await pool.query(query);
    const categorias = results.map(result => result.category);
    res.status(200).json({ categorias });
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener las categorías" });
  }
};




module.exports.showProductosPorCategoria = async (req, res) => {
  const categoria = req.params.categoria;

  try {
    const query = "SELECT * FROM products WHERE category = ?;";
    const [results] = await pool.query(query, [categoria]);
    res.status(200).json({ productos: results });
  } catch (error) {
    console.error("Error al obtener los productos por categoría:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener los productos por categoría" });
  }
};










module.exports.obtenerImagenesParaGaleriaproducto3 = async (req, res) => {
  try {
    const { title } = req.body;
    const query = 'SELECT thumbnail, imagen1, imagen2 FROM products WHERE title = ?';
    const [results] = await pool.query(query, [title]);
    res.status(200).json({ imagenes: results });
  } catch (error) {
    console.error("Error al obtener las imágenes para la galería del producto:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener las imágenes para la galería del producto" });
  }
};








module.exports.showProductosporId = async (req, res) => {


  const id = req.params.id;

  try {

    const query = "SELECT * FROM products WHERE id = ?;";

    const [results] = await pool.query(query, [id]);


    console.log('estos son los results');

    console.log(results);

  

    res.status(200).json({ producto: results });

  } catch (error) {

    console.error("Error al obtener el producto por id:", error);
    return res.status(500).json({ message: "Error en el servidor al obtener el producto por id" });
  }
};


