const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.user = null;
        res.locals.user = null;
        return next();
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            req.user = null;
            res.locals.user = null;
        } else {
            req.user = decoded;
            res.locals.user = decoded;
        }
        next(); 
    });
};
