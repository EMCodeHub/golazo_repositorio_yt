const nodemailer = require('nodemailer');
const { promisify } = require('util');

// Crear el transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Cambiado a false para usar TLS en lugar de SSL
  auth: {
    user: 'elgolazoshop@gmail.com',
    pass: 'aquf jsda zwnh kxdr'  
  }
});

transporter.verify().then(() => {
  console.log('Ready for send emails');
});

// Crear una versión promisificada de transporter.sendMail
const sendMailAsync = promisify(transporter.sendMail).bind(transporter);

// Función para enviar el correo electrónico con un código de seguridad numérico de 6 cifras
module.exports.sendEmail = async (req, res) => {
  try {
    // Generar un código de seguridad numérico aleatorio de 6 cifras
    const securityCode = Math.floor(100000 + Math.random() * 900000);

    // Configurar el correo electrónico con el código de seguridad
    const mailOptions = {
      from: 'elgolazoshop@gmail.com',
      to: req.body.to, // Dirección de correo electrónico del destinatario
      subject: 'Código de seguridad',
      text: `Este es su código de seguridad: ${securityCode}` // Mensaje con el código de seguridad
    };

    // Enviar el correo electrónico
    const info = await sendMailAsync(mailOptions);
    console.log('Correo electrónico enviado:', info.response);

    // Envía la respuesta con el mensaje
    res.status(200).json({ message: 'Correo electrónico enviado correctamente.', securityCode });
  } catch (error) {
    console.log('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Error al enviar el correo electrónico.' });
  }
};
