const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const usuarioValidator = require('../middlewares/usuarioValidator');

router.get('/', usuarioController.listarUsuarios); // Listar todos los usuarios
router.get('/create', usuarioControllerController.formUsuario); // Formulario para crear un nuevo usuario
router.post('/', usuarioValidator, usuarioController.agregarUsuario); // Crear un nuevo usuario
router.get('/:id', usuarioController.editarUsuario); // Obtener un usuario por ID
router.put('/:id', usuarioValidator, usuarioController.actualizarUsuario); // Actualizar un usuario existente
router.delete('/:id', usuarioController.eliminarUsuario); // Eliminar un usuario

module.exports = router;