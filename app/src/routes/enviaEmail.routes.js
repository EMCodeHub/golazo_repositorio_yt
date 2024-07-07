const express = require("express");
const { sendEmail } = require("../controllers/enviaEmail.controller.js");

const router = express.Router();

router.post("/enviamail", sendEmail);

module.exports = router;
