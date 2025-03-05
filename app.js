const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080; // Asegura que coincida con Railway

app.use(express.json()); // Middleware para parsear JSON

// Ruta de prueba para confirmar que el backend responde
app.get("/", (req, res) => {
  res.send("Servidor funcionando en Railway 🚀");
});

// 🔹 Asegura que la ruta /contact exista y sea POST
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Respuesta rápida al usuario
    res.status(200).json({ message: "Correo en proceso de envío" });

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "yrcervando01@gmail.com",
      subject: "Nuevo mensaje de contacto",
      html: `<h2>Nuevo mensaje de contacto</h2>
             <p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Correo:</strong> ${email}</p>
             <p><strong>Mensaje:</strong> ${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente");

  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
});

// 🔹 Escuchar en el puerto correcto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
