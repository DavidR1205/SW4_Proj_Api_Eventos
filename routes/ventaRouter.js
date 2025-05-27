const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const ventaValidator = require('../middlewares/ventaValidator');

// Rutas para las ventas
router.get('/', ventaController.listarVentas); // Listar todas las ventas
router.get('/create', ventaController.formVenta); // Formulario para crear una nueva venta
router.post('/', ventaValidator, ventaController.agregarVenta); // Crear una nueva venta
router.get('/:id', ventaController.editarVenta); // Obtener una venta por ID
router.put('/:id', ventaValidator, ventaController.actualizarVenta); // Actualizar una venta existente
router.delete('/:id', ventaController.eliminarVenta); // Eliminar una venta
router.get('/:id/edit', ventaController.editarVenta); // Obtener una venta por ID
module.exports = router;