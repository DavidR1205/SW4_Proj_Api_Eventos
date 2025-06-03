const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

router.post('/preferencia', pagoController.generarPreferencia);
/*router.get('/exito', (req, res) => {
    res.render('pages/home/pago_exito');
});*/
router.get('/exito', pagoController.pagoExitoso);
router.get('/procesando', (req, res) => {
    res.render('pages/home/procesando');
});

router.get('/fallo', (req, res) => {
    res.render('pages/home/pago_fallo', { mensaje: 'El pago fue rechazado o cancelado.' });
});

router.get('/pendiente', (req, res) => {
    res.render('pages/home/pago_pendiente', { mensaje: 'Su pago está pendiente de confirmación.' });
});

module.exports = router;