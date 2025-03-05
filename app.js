const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
require("dotenv").config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", contactRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
