const { body } = require('express-validator');

const validBoleta = [
    body('id_evento')
        .notEmpty()
        .withMessage('Debe ingresar el evento al que pertenece la boleta')
        .isInt()
        .withMessage('El evento debe ser un número'),

    body('precio_boleta')
        .notEmpty()
        .withMessage('Debe ingresar un precio para la boleta')
        .isFloat()
        .withMessage('Solo se pueden ingresar datos numéricos'),

    body('tipo_boleta')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('Debe ingresar el tipo de boleta'),

    body('localidad_boleta')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('Debe ingresar la localidad a la que pertenece la boleta'),

    body('num_personas')
        .notEmpty()
        .withMessage('Debe ingresar el número de personas que ingresan con la boleta')
        .isInt()
        .withMessage('Solo se pueden ingresar datos numéricos'),
];

module.exports = validBoleta;
