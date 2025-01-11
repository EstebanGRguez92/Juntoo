const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Modelo de usuario
const bcrypt = require("bcrypt"); // Importamos bcrypt

// Ruta para registro de usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validar datos básicos
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Cifrar la contraseña
        const saltRounds = 10; // Nivel de cifrado (puedes cambiarlo)
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear nuevo usuario
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.', error });
    }
});

// Ruta para inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validar datos básicos
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Respuesta simulada de autenticación
        return res.status(200).json({ message: 'Inicio de sesión exitoso.', user });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.', error });
    }
});

module.exports = router;
