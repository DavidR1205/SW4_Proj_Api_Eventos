const { body } = require('express-validator');

const usuarioValidator = [
    body('primer_nombre').notEmpty().withMessage('El primer nombre es obligatorio'),
    body('primer_apellido').notEmpty().withMessage('El primer apellido es obligatorio'),
    body('correo_electronico').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('id_rol').notEmpty().isInt().withMessage('El rol es obligatorio y debe ser un número')
];

module.exports = usuarioValidator;