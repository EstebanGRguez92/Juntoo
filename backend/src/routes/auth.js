const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Modelo de usuario
const bcrypt = require('bcrypt'); // Para cifrado de contraseñas
const { body, validationResult } = require('express-validator');
const { generateToken } = require('../utils/jwt'); // Importar función para generar tokens
const authenticateToken = require('../middlewares/auth');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Ventana de tiempo: 15 minutos
    max: 5, // Máximo de 5 intentos por IP
    message: {
      message: "Has excedido el número de intentos de inicio de sesión. Intenta nuevamente después de 15 minutos.",
    },
    standardHeaders: true, // Enviar información de límites en los headers `RateLimit-*`
    legacyHeaders: false, // Deshabilitar headers `X-RateLimit-*`
});


// Ruta para registro de usuario
router.post(
    '/register',
    [
        body('username').notEmpty().withMessage('El nombre de usuario es obligatorio.'),
        body('email').isEmail().withMessage('Debe proporcionar un correo válido.'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('La contraseña debe tener al menos 8 caracteres.')
            .matches(/[A-Za-z]/)
            .withMessage('La contraseña debe incluir letras.')
            .matches(/\d/)
            .withMessage('La contraseña debe incluir números.')
            .matches(/[@$!%*?&]/)
            .withMessage('La contraseña debe incluir al menos un símbolo especial.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password } = req.body;

        try {
            // Verificar si el usuario ya existe
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El correo ya está registrado.' });
            }

            // Cifrar la contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Crear nuevo usuario
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            // Generar token JWT
            const token = generateToken({ id: newUser._id, email: newUser.email });

            // Devolver respuesta exitosa
            return res.status(201).json({
                message: 'Usuario registrado exitosamente.',
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                },
                token, // Enviar token en la respuesta
            });
        } catch (error) {
            console.error('Error al registrar el usuario:', error); // Log del error en la consola
            res.status(500).json({
                message: 'Error en el servidor.',
                error: error.message || error,
            });
        }
    }
);

// Ruta para inicio de sesión
router.post(
    '/login',
    loginLimiter, // Aplica el limitador a la ruta de login
    [
        body('email').isEmail().withMessage('Debe proporcionar un correo válido.'),
        body('password').notEmpty().withMessage('La contraseña es obligatoria.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            // Buscar usuario por email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }

            // Comparar la contraseña proporcionada con la almacenada
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }

            // Generar token JWT
            const token = generateToken({ id: user._id, email: user.email });

            // Respuesta exitosa
            return res.status(200).json({
                message: 'Inicio de sesión exitoso.',
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
                token, // Enviar token en la respuesta
            });
        } catch (error) {
            console.error('Error en el inicio de sesión:', error); // Log del error en la consola
            res.status(500).json({ message: 'Error en el servidor.', error });
        }
    }
);

// Ruta para validar el token
router.post('/validate-token', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Token válido.' });
});

module.exports = router;
