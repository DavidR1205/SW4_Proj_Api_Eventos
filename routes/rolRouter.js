const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const rolValidator = require('../middlewares/rolValidator');

router.get('/', rolController.listarRoles); // Listar todos los roles
router.post('/', rolValidator, rolController.agregarRol); // Crear un nuevo rol
router.get('/:id', rolController.editarRol); // Obtener un rol por ID
router.put('/:id', rolValidator, rolController.actualizarRol); // Actualizar un rol existente
router.delete('/:id', rolController.eliminarRol); 

module.exports = router;