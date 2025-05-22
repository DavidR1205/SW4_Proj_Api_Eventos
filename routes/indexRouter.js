const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/indexController');

router.get('/', eventoController.listarEventosIndex);
router.get('/:id', eventoController.showEventoIndex);

module.exports = router;