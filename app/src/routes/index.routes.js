const express = require("express");
const { index, ping } = require("../controllers/index.rotes.js");

const router = express.Router();

router.get("/", index);

router.get("/ping", ping);

module.exports = router;
