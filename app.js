const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8081;

// Verificar si las variables de entorno están cargadas
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Cargada correctamente" : "No cargada");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando en Railway 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://cervandoyr.github.io'], // Permitir tu frontend local y en producción
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));
