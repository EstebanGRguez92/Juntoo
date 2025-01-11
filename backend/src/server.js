const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/auth');
const connectDB = require('./db');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json()); // Para analizar JSON en solicitudes
app.use(cors()); // Permite solicitudes desde el frontend
app.use('/api', authRoutes); // Rutas de autenticación

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Backend funcionando!");
});

// Puerto del servidor
const PORT = process.env.PORT || 5001;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
