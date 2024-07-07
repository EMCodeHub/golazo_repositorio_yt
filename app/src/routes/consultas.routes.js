const express = require("express");
const { sendConsulta, mostrarConsultas, mostrarConsultasporId, updateconsultaporid } = require("../controllers/consultas.controller.js");

const router = express.Router();

router.post("/consulta", sendConsulta);

router.get("/mostrarConsultas", mostrarConsultas);

router.post("/mostrarConsultasporId", mostrarConsultasporId);

router.put("/updateconsultaporid", updateconsultaporid);

module.exports = router;
