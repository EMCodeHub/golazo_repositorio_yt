const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productscrud.controllers.js");
const requireAuth = require("../middleware/requireAuth.js");

const routercrud = express.Router();

routercrud.use(requireAuth);

routercrud.get("/productscrud", getProducts);

routercrud.get("/productscrud/:id", getProduct);

routercrud.post("/productscrud", createProduct);

routercrud.put("/productscrud/:id", updateProduct);

routercrud.delete("/productscrud/:id", deleteProduct);

module.exports = routercrud;
