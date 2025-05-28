const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/compraIndexController');
const authValidator = require('../middlewares/authValidator');

router.post('/carrito/agregar', authValidator ,carritoController.agregarCarrito);
router.get('/carrito', authValidator, carritoController.verCarrito);
router.get('/carrito/eliminar/:id_boleta', authValidator, carritoController.eliminarItem);

module.exports = router;