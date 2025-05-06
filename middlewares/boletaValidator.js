const { body } = require('express-validator');

const validBoleta = [
    body('precio_boleta')
        .notEmpty()
        .withMessage('Debe ingresar un precio para la boleta')
        .isFloat()
        .withMessage('Solo se pueden ingresar datos numericos'),

    body('tipo_boleta')
        .notEmpty()
        .isLength({min: 1})
        .withMessage('Debe ingresar el tipo de boleta'),

    body('localidad_boleta')
        .notEmpty()
        .isLength({min: 1})
        .withMessage('Debe ingresar la localidad a la que pertenece la boleta'),

    body('num_personas')
        .notEmpty()
        .withMessage('Debe ingresar el numero de personas que ingresa con la boleta')
        .isInt()
        .withMessage('Solo se pueden ingresar datos numericos'),
];

module.exports = validBoleta;