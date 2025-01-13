const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Leer token desde el encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret); // Verificar token
        req.user = decoded; // Almacenar datos del usuario en la solicitud
        next(); // Continuar con la siguiente función
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = authenticateToken;
