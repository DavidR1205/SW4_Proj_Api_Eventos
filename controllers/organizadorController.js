const { validationResult } = require('express-validator');
const organizadorModel = require('../models/organizadorModel');

exports.listarOrganizadores = async(req, res) => {
    try {
        const organizadores = await organizadorModel.obtenerOrganizadores();
        res.json(organizadores);
        /*res.render('organizador/index', {
            organizadores
        });*/
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los organizadores'
        });   
    }
}

exports.formOrganizador = (req, res) => {
    res.render('organizador/form', {
        title: 'Registrar Organizador',
        organizador: {},
        errors: [],
        isEditing: false
    });
};

exports.agregarOrganizador = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('organizador/form', {
            title: 'Registrar Organizador',
            organizador: req.body,
            errors: errors.array(),
            isEditing: false
        });
    }

    try {
        await organizadorModel.crearOrganizador(req.body);
        res.redirect('/organizador');
    } catch (error) {
        console.error(error);
        res.render('organizador/form', {
            title: 'Registrar Organizador',
            organizador: req.body,
            errors: [{message: 'Error al crear el organizador. Revise de nuevo los campos ingresados.'}],
            isEditing: false
        });
    }
};

exports.editarOrganizador = async (req, res) => {
    try {
        const organizador = await organizadorModel.obtenerOrganizadoresId(req.params.id);
        if (!organizador) {
            return res.status(404).json({message: 'Organizador no encontrado'})/*render('error', {
                title: 'Error',
                message: 'Organizador no encontrado'
            });*/
        }
        res.status(200).json(organizador)
        /*res.render('organizador/form', {
            title: 'Editar Organizador',
            organizador,
            errors: [],
            isEditing: true
        });*/
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los datos del organizador'})
        /*res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los datos del organizador'
        });*/
    }
};

exports.actualizarOrganizador = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: 'Error en la validacion',
            errors: errors.array()
        })
        /*return res.render('organizador/form', {
            title: 'Editar Organizador',
            organizador: { ...req.body, id: req.params.id},
            errors: errors.array(),
            isEditing: true
        });*/
    }

    try {
        const success = await organizadorModel.actualizarOrganizador(req.params.id, req.body);
        if (!success) {
            return res.status(404).json({message: 'Organizador no encontrado'});
            /*return res.status(404).render('error', {
                title: 'Error',
                message: 'Organizador no encontrado'
            });*/
        }
        res.status(200).json({ message: 'Organizador actualizado con exito' });
        //res.redirect('/organizador')
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el organizador' });
        /*res.render('organizador/form', {
            title: 'Editar Organizador',
            organizador: {...req.body, id: req.params.id},
            errors: [{ message: 'Error al actualizar el organizador' }],
            idEditing: true
        });*/
    }
};

exports.eliminarOrganizador = async (req, res) => {
    try {
        const success = await  organizadorModel.eliminarOrganizador(req.params.id);
        if (!success) {
            return res.status(404).json( {success: false, message: 'Organizador no encontrado'});
        }
        res.redirect('/organizador')
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar el Organizador' });
    }
};