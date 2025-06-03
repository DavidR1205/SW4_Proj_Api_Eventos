const { validationResult } = require('express-validator');
const organizadorModel = require('../models/organizadorModel');

exports.listarOrganizadores = async (req, res) => {
    try {
        const organizadores = await organizadorModel.obtenerOrganizadores();
        res.render('pages/admin/organizador/index', {
            title: 'Organizadores',
            organizadores
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar los organizadores' });
    }
};

exports.formOrganizador = (req, res) => {
    res.render('pages/admin/organizador/form', {
        title: 'Organizador',
        organizador: {},
        errors: [],
        isEditing: false
    });
};

exports.agregarOrganizador = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/organizador/form', {
            title: 'Organizador',
            organizador: req.body,
            errors: errors.array(),
            isEditing: false
        });
    }
    try {
        await organizadorModel.crearOrganizador(req.body);
        res.redirect('/admin/organizador');
    } catch (error) {
        res.render('pages/admin/organizador/form', {
            title: 'Organizador',
            organizador: req.body,
            errors: [{ message: 'Error al crear el organizador. Revise los campos.' }],
            isEditing: false
        });
    }
};

exports.editarOrganizador = async (req, res) => {
    try {
        const organizador = await organizadorModel.obtenerOrganizadoresId(req.params.id);
        if (!organizador) {
            return res.status(404).render('error', { title: 'Error', message: 'Organizador no encontrado' });
        }
        res.render('pages/admin/organizador/form', {
            title: 'Organizador',
            organizador,
            errors: [],
            isEditing: true
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar los datos del organizador' });
    }
};

exports.actualizarOrganizador = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/organizador/form', {
            title: 'Organizador',
            organizador: { ...req.body, id_organizador: req.params.id },
            errors: errors.array(),
            isEditing: true
        });
    }
    try {
        const success = await organizadorModel.actualizarOrganizador(req.params.id, req.body);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Organizador no encontrado' });
        }
        res.redirect('/admin/organizador');
    } catch (error) {
        res.render('pages/admin/organizador/form', {
            title: 'Organizador',
            organizador: { ...req.body, id_organizador: req.params.id },
            errors: [{ message: 'Error al actualizar el organizador' }],
            isEditing: true
        });
    }
};

exports.eliminarOrganizador = async (req, res) => {
    try {
        const success = await organizadorModel.eliminarOrganizador(req.params.id);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Organizador no encontrado' });
        }
        res.redirect('/admin/organizador');
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al eliminar el organizador' });
    }
};