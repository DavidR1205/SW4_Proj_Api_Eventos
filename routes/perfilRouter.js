const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const usuarioValidator = require('../middlewares/usuarioValidator');
const loginValidator = require('../middlewares/loginValidator');
const perfilValidator = require('../middlewares/perfilValidator');
// PERFIL del usuario tipo HOME
router.get('/perfil', loginValidator, usuarioController.mostrarPerfil);



router.post('/perfil', loginValidator, perfilValidator, usuarioController.actualizarPerfil);

module.exports = router;
