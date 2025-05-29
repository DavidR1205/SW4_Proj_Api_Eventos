const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/indexController');
const usuarioController = require('../controllers/usuarioController');
const compraIndexController = require('../controllers/compraIndexController');
const loginValidator = require('../middlewares/loginValidator');

//router.get('/carrito', compraIndexController.listarCarrito);
//router.post('/comprar/agregar', compraIndexController.agregarCarrito);
router.get('/', eventoController.listarEventosIndex);
router.get('/:id', eventoController.showEventoIndex);


router.get('/registrar', usuarioController.formRegistrar);
router.post('/registrar', usuarioController.registrarUsuario);

router.get('/comprar/:id', compraIndexController.listar)
router.get('/perfil',usuarioController.mostrarPerfil);

module.exports = router;