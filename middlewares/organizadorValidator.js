const { body } = require('express-validator');

const validOrganizador = [
    body('nombre_organizador')
        .notEmpty()
        .isLength({ min: 1})
        .withMessage('El nombre del organizador es obligatorio'),
    
    body('tipo_documento')
        .notEmpty()
        .withMessage('El tipo de documento es obligatorio'),

    body('numero_documento')
        .notEmpty()
        .withMessage('El numero de documento es obligatorio')
        .isInt()
        .withMessage('El numero de documento solo admite valores numericos')
];

module.exports = validOrganizador;