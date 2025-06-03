const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login'); // O res.status(401).send('Acceso no autorizado');
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.redirect('/login'); // O res.status(403).send('Token inválido');
        }

        if (user.rol !== 1) {
            return res.status(403).send('Acceso denegado: solo administradores.');
        }

        req.user = user;
        res.locals.user = user;
        next();

    });
};