const express = require('express');
const router = express.Router();
const entradaController = require('../controllers/entradaController');

router.get('/entradas', entradaController.verEntradas);

module.exports = router;