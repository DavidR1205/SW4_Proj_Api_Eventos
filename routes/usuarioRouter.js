const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const usuarioValidator = require('../middlewares/usuarioValidator');
const loginValidator = require('../middlewares/loginValidator');




//router.get('/', loginValidator, usuarioController.listarUsuarios);// bloquea la vista de usuarios si no hay un usuario logueado
router.get('/', usuarioController.listarUsuarios); // Listar todos los usuarios sin jwt
router.get('/create', usuarioController.formUsuario); // Formulario para crear un nuevo usuario
router.post('/', usuarioValidator, usuarioController.agregarUsuario); // Crear un nuevo usuario
router.get('/perfil', usuarioValidator, usuarioController.mostrarPerfil);
router.post('/perfil', loginValidator, usuarioController.actualizarPerfil);



router.get('/:id/edit', usuarioController.editarUsuario); // Obtener un usuario por ID
router.put('/:id', usuarioValidator, usuarioController.actualizarUsuario); // Actualizar un usuario existente
router.delete('/:id', usuarioController.eliminarUsuario); // Eliminar un usuario


module.exports = router;