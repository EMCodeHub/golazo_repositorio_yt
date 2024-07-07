const express = require("express");
const {
  showpedidos,
  showcodigopedidosporid,
  showPreciototalporcodigopedido,
  showallpedidos,
  showpedidosporid,
  updatepedidosporid,
  showtablausuarioconcodigopedido,
  pedidossinregistro
} = require("../controllers/showpedidos.controller.js");

const router = express.Router();

router.post("/showpedidos", showpedidos);

router.post("/showcodigopedidoporid", showcodigopedidosporid);

router.post("/showPreciototalporcodigopedido", showPreciototalporcodigopedido);

router.get("/showallpedidos", showallpedidos);

router.post("/showpedidosporid", showpedidosporid);

router.put("/updatepedidosporid", updatepedidosporid);

router.get("/showtablausuarioconcodigopedido", showtablausuarioconcodigopedido);

router.post("/pedidossinregistro", pedidossinregistro);

module.exports = router;
