
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;


// Hola

const SSL_CERT_FILE = 'ruta/a/tu/certificado.crt';
const SSL_KEY_FILE = 'ruta/a/tu/clave.key';



module.exports = {

  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  SSL_CERT_FILE,
  SSL_KEY_FILE

};
