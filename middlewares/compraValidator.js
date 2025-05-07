const { body } = require('express-validator');

const compraValidator = [
    body('cantidad_boletas')
        .notEmpty()
        .withMessage('La cantidad de boletas es obligatoria')
        .isInt({ min: 1 })
        .withMessage('La cantidad de boletas debe ser un número entero positivo'),

    body('valor_entrada')
        .notEmpty()
        .withMessage('El valor de la entrada es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El valor de la entrada debe ser un número positivo'),

    body('valor_servicio')
        .notEmpty()
        .withMessage('El valor del servicio es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El valor del servicio debe ser un número positivo'),

    body('valor_pago')
        .notEmpty()
        .withMessage('El valor del pago es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El valor del pago debe ser un número positivo'),

    body('id_usuario')
        .notEmpty()
        .withMessage('El ID del usuario es obligatorio')
        .isInt()
        .withMessage('El ID del usuario debe ser un número entero'),

    body('id_boleta')
        .notEmpty()
        .withMessage('El ID de la boleta es obligatorio')
        .isInt()
        .withMessage('El ID de la boleta debe ser un número entero'),
];

module.exports = compraValidator;