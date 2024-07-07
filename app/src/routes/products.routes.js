const express = require("express");
const {
  showProducts,
  searchProducts,
  showMainProducts,
  showMasVendidosCelulares,
  showSmartphones,
  showLaptops,
  showMasVendidosLaptops,
  showTelevisores,
  showTelevisoresmasvendidos,
  showTelevisoresCarousel,
  showLaptopsCarousel,
  showSmartphonesCarousel,
  showCategorias,
  showProductosPorCategoria,
  obtenerImagenesParaGaleriaproducto3,
  showProductosporId
} = require("../controllers/products.controller.js");

const router = express.Router();

router.get("/products", showProducts);

router.get("/search", searchProducts);

router.get("/mainproduct", showMainProducts);

router.get("/masvendidocelulares", showMasVendidosCelulares);

router.get("/showsmartphones", showSmartphones);

router.get("/showLaptops", showLaptops);

router.get("/showMasVendidosLaptops", showMasVendidosLaptops);

router.get("/showTelevisores", showTelevisores);

router.get("/showTelevisoresmasvendidos", showTelevisoresmasvendidos);

router.get("/showTelevisoresCarousel", showTelevisoresCarousel);

router.get("/showLaptopsCarousel", showLaptopsCarousel);

router.get("/showsmartphonesCarousel", showSmartphonesCarousel);

router.get("/showCategorias", showCategorias);

router.post("/showProductosPorCategoria/:categoria", showProductosPorCategoria);

router.post("/obtenerImagenesParaGaleriaproducto3", obtenerImagenesParaGaleriaproducto3);

router.get("/showProductosporId/:id", showProductosporId);





module.exports = router;
