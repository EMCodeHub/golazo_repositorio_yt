const express = require("express");
const {
  getLoginn,
  signupLoginn,
  recordarusuario,
  validaruser,
  insertacookie,
  cuentanumerodecookies,
  insertacookieejercicioedu,
  registroporcedula,
  encuentrausuarioporcedula
} = require("../controllers/users.controller.js");

const router = express.Router();

router.post("/login", getLoginn);

router.post("/register", signupLoginn);

router.post("/recordarusuario", recordarusuario);

router.put("/validaruser", validaruser);

router.post("/insertacookie", insertacookie);

router.get("/cuentanumerodecookies", cuentanumerodecookies);

router.get("/insertacookieejercicioedu", insertacookieejercicioedu);

router.post("/registroporcedula", registroporcedula);

router.post("/encuentrausuarioporcedula", encuentrausuarioporcedula);












module.exports = router;
