const { jwtVerify } = require('jose');

const requireAuthClient = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization;

  try {
    const secretKey = Buffer.from(process.env.JWT_SECRET2, 'base64');

    // Verificar y decodificar el token
    const { payload } = await jwtVerify(token, secretKey);

    // Extraer el ID del usuario del token decodificado
    const { id } = payload;

    const user = { id };

    // Asignar el usuario a req.user
    req.user = user;

    // Permitir que la solicitud avance
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuthClient;
