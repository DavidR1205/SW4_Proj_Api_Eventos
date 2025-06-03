const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/compraIndexController');
const authValidator = require('../middlewares/authValidator');

router.post('/carrito/agregar', carritoController.agregarCarrito);
router.get('/carrito', carritoController.verCarrito);
router.get('/carrito/eliminar/:id_boleta', carritoController.eliminarItem);

module.exports = router;