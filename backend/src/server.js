require('dotenv').config(); // Cargar variables de entorno al inicio

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

// Crear la instancia de la aplicación
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json()); // Para analizar JSON en solicitudes
app.use(cors()); // Permite solicitudes desde otros dominios

// Middleware para capturar errores JSON mal formateados
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Error de sintaxis JSON:', err.message);
        return res.status(400).json({ message: 'El formato del JSON es inválido.' });
    }
    next();
});

// Rutas
app.use('/api', authRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
    res.send('¡Backend funcionando!');
});

// Puerto del servidor
const PORT = process.env.PORT || 5001;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
