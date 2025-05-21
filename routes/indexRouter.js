const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/indexController');

router.get('/', eventoController.listarEventosIndex);

module.exports = router;