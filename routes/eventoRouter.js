const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const eventoValidator = require('../middlewares/eventoValidator');

router.get('/', eventoController.listarEventos);
router.get('/create', eventoController.formEvento);
router.post('/', eventoValidator, eventoController.agregarEvento);
router.get('/:id/edit', eventoController.editarEvento);
router.put('/:id', eventoValidator, eventoController.actualizarEvento);
router.delete('/:id', eventoController.eliminarEvento);

module.exports = router;