const { body } = require('express-validator');

const perfilValidator = [
    body('primer_nombre').notEmpty().withMessage('El primer nombre es obligatorio'),
    body('primer_apellido').notEmpty().withMessage('El primer apellido es obligatorio'),
    body('correo_electronico').isEmail().withMessage('Debe ser un correo electrónico válido')
    
];

module.exports = perfilValidator;
