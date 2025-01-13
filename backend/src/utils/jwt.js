const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

// Generar un token JWT
const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Configurar tiempo de expiración
};

// Verificar un token JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
