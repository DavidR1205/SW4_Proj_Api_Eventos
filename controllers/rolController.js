const { validationResult } = require('express-validator');
const rolModel = require('../models/rolModel');


exports.listarRoles = async (req, res) => {
    try {
        const roles = await rolModel.obtenerRoles();
        res.render('pages/admin/roles/index', {
            title: 'Roles',
            roles
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar los roles' });
    }
};


exports.formRol = (req, res) => {
    res.render('pages/admin/roles/form', {
        title: 'Rol',
        rol: {},
        errors: [],
        isEditing: false
    });
};

exports.agregarRol = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/roles/form', {
            title: 'Rol',
            rol: req.body,
            errors: errors.array(),
            isEditing: false
        });
    }
    try {
        await rolModel.crearRol(req.body);
        res.redirect('/admin/roles');
    } catch (error) {
        res.render('pages/admin/roles/form', {
            title: 'Rol',
            rol: req.body,
            errors: [{ message: 'Error al crear el rol. Revise los campos.' }],
            isEditing: false
        });
    }
};

// Mostrar formulario para editar rol
exports.editarRol = async (req, res) => {
    try {
        const rol = await rolModel.obtenerRolId(req.params.id);
        if (!rol) {
            return res.status(404).render('error', { title: 'Error', message: 'Rol no encontrado' });
        }
        res.render('pages/admin/roles/form', {
            title: 'Rol',
            rol,
            errors: [],
            isEditing: true
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar los datos del rol' });
    }
};


exports.actualizarRol = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/roles/form', {
            title: 'Rol',
            rol: { ...req.body, id_rol: req.params.id },
            errors: errors.array(),
            isEditing: true
        });
    }
    try {
        const success = await rolModel.actualizarRol(req.params.id, req.body);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Rol no encontrado' });
        }
        res.redirect('/admin/roles');
    } catch (error) {
        res.render('pages/admin/roles/form', {
            title: 'Rol',
            rol: { ...req.body, id_rol: req.params.id },
            errors: [{ message: 'Error al actualizar el rol' }],
            isEditing: true
        });
    }
};


exports.eliminarRol = async (req, res) => {
    try {
        const success = await rolModel.eliminarRol(req.params.id);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Rol no encontrado' });
        }
        res.redirect('/admin/roles');
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al eliminar el rol' });
    }
};