const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');

const validEvento = [
    body('nombre_evento')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('El nombre del evento no puede estar vacio'),

    body('categoria_evento')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('La categoria del evento no puede estar vacia'),

    body('lugar_evento')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('El lugar del evento no puede estar vacio'),

    body('ciudad_evento')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('La ciudad del evento no puede estar vacia'),

    body('departamento_evento')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('El departamento del evento no puede estar vacio'),

    body('aforo_evento')
        .notEmpty()
        .withMessage('Aforo vacio, Diligencie un aforo para el evento')
        .isInt()
        .withMessage('El aforo solo permite valores numericos'),

    body('fecha_inicio_evento')
        .notEmpty()
        .withMessage('Fecha Inicio vacia, Ingrese una fecha inicio para el evento')
        .isDate()
        .withMessage('La fecha inicio solo admite valores tipo fecha'),

    body('hora_inicio_evento')
        .notEmpty()
        .withMessage('Hora de Inicio vacia, Ingrese una hora de inicio para el evento'),
    /*.isTime()
    .withMessage('La hora de inicio solo admite valores tipo hora'),*/

    body('hora_apertura')
        .notEmpty()
        .withMessage('Hora de Apertura de Puertas vacia, Ingrese una hora de apertura de puertas para el evento'),
    /*.isTime()
    .withMessage('La hora de apertura de puertas solo admite valores tipo hora'),*/

    body('genero_evento')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('El genero musical del evento no puede estar vacio'),

    body('edad_minima')
        .notEmpty()
        .withMessage('Edad minima vacia, Diligencie una edad minima para el evento')
        .isInt()
        .withMessage('La edad minima solo admite valores numericos')
];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images_eventos/');
    },
    filename: function (rq, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, gif)'));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = { validEvento, upload };