const nodemailer = require("nodemailer");
require("dotenv").config(); // Para manejar variables de entorno
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Cargada correctamente" : "No cargada");
exports.createContact = async (req, res) => {
  try {
    const { name, lastname, email, message, phone } = req.body;

    if (!name || !lastname || !email || !message || !phone) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Responder inmediatamente para no hacer esperar al usuario
    res.status(200).json({ message: "Enviando" });
    
    // Enviar el correo en segundo plano
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "servitektechnologies@gmail.com",
      subject: "Nuevo mensaje de contacto",
      html: `<h2>Nuevo mensaje de contacto</h2>
             <p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Apellido:</strong> ${lastname}</p>
             <p><strong>Correo:</strong> ${email}</p>
             <p><strong>Telefono:</strong> ${phone}</p>
             <p><strong>Mensaje:</strong> ${message}</p>`,
    };

    transporter.sendMail(mailOptions).catch((error) => {
      console.error("Error al enviar el correo:", error);
    });

  } catch (error) {
    console.error("Error en la validación:", error);
  }
};
