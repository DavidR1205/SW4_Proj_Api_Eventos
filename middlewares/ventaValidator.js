const { body } = require('express-validator');

const ventaValidator = [
    body('valor_venta')
        .notEmpty()
        .withMessage('El valor de la venta es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El valor de la venta debe ser un número positivo'),

    body('fecha_venta')
        .notEmpty()
        .withMessage('La fecha de la venta es obligatoria')
        .isDate()
        .withMessage('La fecha de la venta debe ser una fecha válida'),

    body('metodo_pago')
        .optional()
        .isString()
        .withMessage('El método de pago debe ser una cadena de texto'),

    body('id_compra')
        .notEmpty()
        .withMessage('El ID de la compra es obligatorio')
        .isInt()
        .withMessage('El ID de la compra debe ser un número entero'),
];

module.exports = ventaValidator;