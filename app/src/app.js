const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const usersRoutes = require("./routes/users.routes.js");
const usersAuthRoutes = require("./routes/usersauth.routes.js");
const indexRoutes = require("./routes/index.routes.js");
const consultasroutes = require("./routes/consultas.routes.js");
const { fileURLToPath } = require("url");
const { dirname, join } = require("path");
const productsRoutes = require("./routes/products.routes.js");
const productcrudRoutes = require("./routes/productscrud.routes.js");
const showPedidos = require("./routes/showpedidos.routes.js");
const enviaEmail = require("./routes/enviaEmail.routes.js");
const { PORT } = require("./config.js");

const app = express();

//const __dirname = dirname(fileURLToPath(require("url").fileURLToPath(import.meta.url)));

// Subir
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'La api esta funcionando' }); // Cambia el mensaje aquí
});

app.use(morgan("dev"));

app.use(express.json());

app.use("/", indexRoutes);

app.use("/api", usersRoutes);

app.use("/api/auth", usersAuthRoutes);

app.use("/api", productsRoutes);

app.use("/api", consultasroutes);

app.use("/api", showPedidos);

app.use("/api", enviaEmail);

app.use(productcrudRoutes);



//app.use(express.static(join(__dirname, "../client/dist")));




app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
