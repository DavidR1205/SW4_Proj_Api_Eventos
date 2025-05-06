const express = require('express');
const router = express.Router();
const boletaController = require('../controllers/boletaController');
const boletaValidator = require('../middlewares/boletaValidator');

router.get('/', boletaController.listarBoletas);
router.get('/create', boletaController.formBoletas);
router.post('/', boletaValidator, boletaController.agregarBoleta);
router.get('/:id/edit', boletaController.editarBoleta);
router.put('/:id', boletaValidator, boletaController.actualizarBoleta);
router.delete('/:id', boletaController.eliminarBoleta);

module.exports = router;