const express = require("express");
const {
  insertExtraData,
} = require("../controllers/users.controller.js");

const requireAuthClient = require("../middleware/requireAuthClient.js");

const routerauthclient = express.Router();

routerauthclient.use(requireAuthClient);

routerauthclient.post("/extradata", insertExtraData);

module.exports = routerauthclient;
