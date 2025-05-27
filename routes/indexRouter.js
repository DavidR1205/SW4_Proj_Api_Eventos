const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/indexController');
const compraIndexController = require('../controllers/compraIndexController');

router.get('/carrito', compraIndexController.listarCarrito);
router.post('/comprar/agregar', compraIndexController.agregarCarrito);
router.get('/', eventoController.listarEventosIndex);
router.get('/:id', eventoController.showEventoIndex);
router.get('/comprar/:id', compraIndexController.listar)

module.exports = router;