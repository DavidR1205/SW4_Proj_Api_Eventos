const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/indexController');
const usuarioController = require('../controllers/usuarioController');

router.get('/', eventoController.listarEventosIndex);
router.get('/:id', eventoController.showEventoIndex);


router.get('/registrar', usuarioController.formRegistrar);
router.post('/registrar', usuarioController.registrarUsuario);


module.exports = router;