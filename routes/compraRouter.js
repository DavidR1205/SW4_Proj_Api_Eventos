const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const compraValidator = require('../middlewares/compraValidator');

router.get('/', compraController.listarCompras);
router.post('/', compraValidator, compraController.agregarCompra);
router.get('/:id/edit', compraController.editarCompra);
router.put('/:id', compraValidator, compraController.actualizarCompra); 
router.delete('/:id', compraController.eliminarCompra);

module.exports = router;