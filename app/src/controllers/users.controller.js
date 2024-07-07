const { pool } = require("../db.js");
const { promisify } = require("util");
const { SignJWT } = require("jose");
const { JWT_SECRET, JWT_SECRET2 } = require("./config.js");
const nodemailer = require("nodemailer");

exports.getLoginn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = results[0];
    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const [userRow] = await pool.query(
      "SELECT id, validado FROM users WHERE username = ?",
      [username]
    );

    const userId = userRow[0].id;
    const validado = userRow[0].validado;

    if (user.esadmin === 1) {
      const token = await new SignJWT({ id: user.id, username: user.username, isAdmin: true })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime((10 * 365 * 24 * 60 * 60 * 1000))
        .sign(Buffer.from(JWT_SECRET, 'base64'));

      return res.json({
        token,
        message: "admin",
        user: username,
        id: userId,
        validado,
      });
    } else {
      const token = await new SignJWT({ id: user.id, username: user.username, isAdmin: false })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime((10 * 365 * 24 * 60 * 60 * 1000))
        .sign(Buffer.from(JWT_SECRET2, 'base64'));

      if (validado === 1) {
        return res.json({
          token,
          message: "cliente",
          user: username,
          id: userId,
          validado,
        });
      } else {
        return res.status(401).json({ message: "El usuario no está validado" });
      }
    }
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "elgolazoshop@gmail.com",
    pass: "aquf jsda zwnh kxdr",
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

const sendMailAsync = promisify(transporter.sendMail).bind(transporter);

exports.signupLoginn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      password,
    ]);

    const securityCode = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: "elgolazoshop@gmail.com",
      to: username,
      subject: "Código de seguridad",
      text: `Este es su código de seguridad: ${securityCode}`,
    };

    const info = await sendMailAsync(mailOptions);
    console.log("Correo electrónico enviado:", info.response);

    res
      .status(200)
      .json({ message: "Revise su correo electrónico", securityCode });
  } catch (error) {
    console.error("Error al realizar la inserción:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.validaruser = async (req, res) => {
  const { username } = req.body;

  try {
    await pool.query("UPDATE users SET validado = 1 WHERE username = ?", [
      username,
    ]);

    res
      .status(200)
      .json({ message: "Usuario validado, ya puede iniciar sesión.⬆️" });
  } catch (error) {
    console.error("Error al validar el usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const generateRandomString = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};






exports.insertExtraData = async (req, res) => {


  const {
    username,
    nombre,
    apellidos,
    direccion,
    ciudad,
    codigopostal,
    celular,
    email,
    cart,
  } = req.body;

  if (
    !username ||
    !nombre ||
    !apellidos ||
    !direccion ||
    !ciudad ||
    !codigopostal ||
    !celular ||
    !email ||
    !cart
  ) {
    return res
      .status(400)
      .json({
        message: "La solicitud es incompleta o contiene datos no válidos",
      });
  }

  try {
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existingUsers.length === 0) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    await pool.query(
      "UPDATE users SET nombre = ?, apellidos = ?, direccion = ?, ciudad = ?, codigopostal = ?, celular = ?, email = ? WHERE username = ?",
      [
        nombre,
        apellidos,
        direccion,
        ciudad,
        codigopostal,
        celular,
        email,
        username,
      ]
    );

    const randomString = generateRandomString();

    const [userRow] = await pool.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );

    if (userRow.length === 0) {
      return res
        .status(400)
        .json({ message: "El usuario id de usuario no existe" });
    }

    const userId = userRow[0].id;

    const estadopedido = "no enviado";
    const estapagado = "no pagado";

    for (const item of cart) {
      await pool.query(
        "INSERT INTO pedidos (nombreproducto, cantidad, codigopedido, price, user_id, estadopedido, estapagado, pulgadas, color, almacenamiento, ram, procesador, creado_en) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
        [
          item.title,
          item.quantity,
          randomString,
          item.price,
          userId,
          estadopedido,
          estapagado,
          item.pulgadas,
          item.color,
          item.almacenamiento,
          item.ram,
          item.procesador
        ]
      );
    }

    return res.json({
      message: `Completado el pago, podrá dar seguimiento a su pedido mediante este código ${randomString}`,
      random: randomString,
    });
  } catch (error) {
    console.error("Error al actualizar los datos extra:", error);
    if (error.code === "SQL_ERROR_CODE") {
      return res
        .status(500)
        .json({ message: "Error al ejecutar la consulta en la base de datos" });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};






exports.recordarusuario = async (req, res) => {
  const { username } = req.body;

  try {
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const password = existingUsers[0].password;

    const mailOptions = {
      from: "elgolazoshop@gmail.com",
      to: username,
      subject: "Recuperación de Contraseña",
      text: `Estimado ${username}, su contraseña es: ${password}`,
    };

    const info = await sendMailAsync(mailOptions);
    console.log("Correo electrónico enviado:", info.response);

    return res.json({ message: "Correo electrónico enviado correctamente" });
  } catch (error) {
    console.error("Error al recuperar la contraseña del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.insertacookie = async (req, res) => {
  try {
    const { cookie } = req.body;

    await pool.query("INSERT INTO visitas (registrocookie) VALUES (?)", [
      cookie,
    ]);

    return res
      .status(200)
      .json({
        success: true,
        message: "Cookie insertada correctamente en la tabla visitas",
      });
  } catch (error) {
    console.error("Error al insertar la cookie en la tabla visitas:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error al insertar la cookie en la tabla visitas",
      });
  }
};

exports.cuentanumerodecookies = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS numero_filas FROM visitas WHERE registrocookie IS NOT NULL"
    );

    const numeroFilas = result[0][0].numero_filas;

    return res.status(200).json({ numerofilas: numeroFilas });
  } catch (error) {
    console.error("Error al contar el número de filas:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.insertacookieejercicioedu = async (req, res) => {
  res.cookie('miCookie', 'miValor', { maxAge: 3600000, httpOnly: true });

  return res
    .status(200)
    .json({
      success: true,
      message: "Cookie insertada correctamente en la tabla visitas",
    });
};













exports.registroporcedula = async (req, res) => {


  const {
    nombre,
    apellidos,
    direccion,
    ciudad,
    codigopostal,
    celular,
    email,
    cedula,
    cart,
  } = req.body;

  if (
  
    !nombre ||
    !apellidos ||
    !direccion ||
    !ciudad ||
    !codigopostal ||
    !celular ||
    !email ||
    !cedula ||
    !cart
  ) {
    return res
      .status(400)
      .json({
        message: "La solicitud es incompleta o contiene datos no válidos",
      });
  }

  try {



    await pool.query(
      "INSERT INTO users (nombre, apellidos, direccion, ciudad, codigopostal, celular, email, cedula) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        apellidos,
        direccion,
        ciudad,
        codigopostal,
        celular,
        email,
        cedula
        
      ]
    );
    

    const randomString = generateRandomString();




    const [userRow] = await pool.query(
      "SELECT cedula FROM users WHERE cedula = ?",
      [cedula]
    );


    if (userRow.length === 0) {
      return res
        .status(400)
        .json({ message: "No se ha encontrado cedula de usuario buscado por su cedula" });
    }


console.log('esta es la cedula');

console.log(cedula);



    const [userRow2] = await pool.query(
      "SELECT id FROM users WHERE cedula = ?",
      [cedula]
    );


    if (userRow2.length === 0) {
      return res
        .status(400)
        .json({ message: "No se ha encontrado id usuario buscado por su cedula" });
    }



    const userCedula = userRow[0].cedula;



    const userId = userRow2[0].id;


console.log('este es el user Id');

console.log(userId);


    const estadopedido = "no enviado";

    const estapagado = "no pagado";




    for (const item of cart) {
      await pool.query(
        "INSERT INTO pedidos (nombreproducto, cantidad, codigopedido, user_id, price, estadopedido, estapagado, pulgadas, color, almacenamiento, ram, procesador, creado_en, cedula) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)",
        [
          item.title,
          item.quantity,
          randomString,
          userId,
          item.price,
          estadopedido,
          estapagado,
          item.pulgadas,
          item.color,
          item.almacenamiento,
          item.ram,
          item.procesador,
          userCedula
        ]
      );
    }


    return res.json({
      message: `Completado el pago, podrá dar seguimiento a su pedido mediante este código ${randomString}`,
      random: randomString,
    });
  } catch (error) {
    console.error("Error al actualizar los datos extra:", error);
    if (error.code === "SQL_ERROR_CODE") {
      return res
        .status(500)
        .json({ message: "Error al ejecutar la consulta en la base de datos" });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};







exports.encuentrausuarioporcedula = async (req, res) => {
  const { cedula } = req.body;

  try {
    const [userRow] = await pool.query(
      "SELECT nombre, id FROM users WHERE cedula = ?",
      [cedula]
    );

    if (userRow.length === 0) {
      return res
        .status(400)
        .json({ message: "No se ha encontrado ningún usuario con la cédula proporcionada" });
    }

    const userNombre = userRow[0].nombre;
    const userId = userRow[0].id; // El índice debería ser 0, ya que solo hay un objeto en userRow

    res.json({ userNombre, userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocurrió un error al buscar el usuario por cédula" });
  }
};













