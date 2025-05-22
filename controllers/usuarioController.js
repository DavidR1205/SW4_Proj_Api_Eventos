const { validationResult } = require('express-validator');
const usuarioModel = require('../models/usuarioModel');

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.obtenerUsuarios();
        res.render('pages/admin/usuarios/index', {
            title: 'Usuarios',
            usuarios
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar los usuarios' });
    }
};

exports.formUsuario = (req, res) => {
    res.render('pages/admin/usuarios/form', {
        title: 'Usuario',
        usuario: {},
        errors: [],
        isEditing: false
    });
};

exports.agregarUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/usuarios/form', {
            title: 'Usuario',
            usuario: req.body,
            errors: errors.array(),
            isEditing: false
        });
    }
    try {
        await usuarioModel.crearUsuario(req.body);
        res.redirect('/admin/usuarios');
    } catch (error) {
        res.render('pages/admin/usuarios/form', {
            title: 'Usuario',
            usuario: req.body,
            errors: [{ message: 'Error al crear el usuario. Revise los campos.' }],
            isEditing: false
        });
    }
};

exports.editarUsuario = async (req, res) => {
    try {
        const usuario = await usuarioModel.obtenerUsuarioPorId(req.params.id);
        if (!usuario) {
            return res.status(404).render('error', { title: 'Error', message: 'Usuario no encontrado' });
        }
        res.render('pages/admin/usuarios/form', {
            title: 'Usuario',
            usuario,
            errors: [],
            isEditing: true
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar los datos del usuario' });
    }
};

exports.actualizarUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/usuarios/form', {
            title: 'Usuario',
            usuario: { ...req.body, id_usuario: req.params.id },
            errors: errors.array(),
            isEditing: true
        });
    }
    try {
        const success = await usuarioModel.actualizarUsuario(req.params.id, req.body);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Usuario no encontrado' });
        }
        res.redirect('/admin/usuarios');
    } catch (error) {
        res.render('pages/admin/usuarios/form', {
            title: 'Usuario',
            usuario: { ...req.body, id_usuario: req.params.id },
            errors: [{ message: 'Error al actualizar el usuario' }],
            isEditing: true
        });
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        const success = await usuarioModel.eliminarUsuario(req.params.id);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Usuario no encontrado' });
        }
        res.redirect('/admin/usuarios');
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al eliminar el usuario' });
    }
};
