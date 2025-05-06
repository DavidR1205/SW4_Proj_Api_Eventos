const { body } = require('express-validator');

const rolValidator = [
    body('nombre_rol')
    .notEmpty()
    .withMessage('El nombre del rol es obligatorio')
    .isString()
    .withMessage('El nombre del rol debe ser una cadena de texto')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre del rol debe tener entre 3 y 50 caracteres')
];

module.exports = rolValidator;