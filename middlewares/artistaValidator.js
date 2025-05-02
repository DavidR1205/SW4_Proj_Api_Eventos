const { body } = require("express-validator")

const validArtista = [
    body('nombre_artista')
        .notEmpty()
        .withMessage('El nombre del artista es obligatorio'),

    body('genero_musical')
        .isString()
        .withMessage('El genero musical no debe tener numeros')
        .notEmpty()
        .withMessage('El genero musical es obligatorio')
];

module.exports = validArtista;