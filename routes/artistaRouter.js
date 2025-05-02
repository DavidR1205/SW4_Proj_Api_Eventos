const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');
const artistaValidator = require('../middlewares/artistaValidator');


router.get('/', artistaController.listarArtistas);
router.get('/create', artistaController.formArtista);
router.post('/', artistaValidator, artistaController.agregarArtista);
router.get('/:id/edit', artistaController.editarArtista);
router.put('/:id', artistaValidator, artistaController.actualizarArtista);
router.delete('/:id', artistaController.eliminarArtista);

module.exports = router;