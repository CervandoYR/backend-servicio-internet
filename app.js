const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080; // Railway asignará un puerto automáticamente

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando en Railway 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
