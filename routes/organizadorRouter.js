const express = require('express')
const router = express.Router();
const organizadorController = require('../controllers/organizadorController');
const OrganizadorValidator = require('../middlewares/organizadorValidator');

router.get('/', organizadorController.listarOrganizadores);
router.get('/create', organizadorController.formOrganizador);
router.post('/', OrganizadorValidator, organizadorController.agregarOrganizador);
router.get('/:id/edit', organizadorController.editarOrganizador);
router.put('/:id', OrganizadorValidator, organizadorController.actualizarOrganizador);
router.delete('/:id', organizadorController.eliminarOrganizador);

module.exports = router;