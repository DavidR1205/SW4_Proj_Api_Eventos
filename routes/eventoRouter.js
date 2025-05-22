const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const { validEvento, upload} = require('../middlewares/eventoValidator');

router.get('/', eventoController.listarEventos);
router.get('/create', eventoController.formEvento);
router.post('/', upload.single('url_image_evento'), validEvento, eventoController.agregarEvento);
router.get('/:id/edit', eventoController.editarEvento);
router.put('/:id', validEvento, eventoController.actualizarEvento);
router.delete('/:id', eventoController.eliminarEvento);

module.exports = router;