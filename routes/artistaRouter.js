const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

router.get('/', artistaController.listarArtistas);

module.exports = router;