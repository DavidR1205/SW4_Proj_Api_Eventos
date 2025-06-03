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

// Mostrar formulario de registro (home)
exports.formRegistrar = (req, res) => {
    res.render('pages/home/registrar', {
        title: 'Registrar Usuario',
        errors: [],
        usuario: {}
    });
};

// Procesar registro desde el home
exports.registrarUsuario = async (req, res) => {
    try {
        // Puedes agregar validaciones aquí si lo deseas
        await usuarioModel.crearUsuario(req.body);
        // Redirige al login después de registrar
        res.redirect('/login');
    } catch (error) {
        res.render('pages/home/registrar', {
            title: 'Registrar Usuario',
            usuario: req.body,
            errors: [{ message: 'Error al registrar usuario. Revise los campos.' }]
        });
    }
};



exports.mostrarPerfil = async (req, res) => {
    try {
        const id_usuario = req.user?.id_usuario;

        if (!id_usuario) return res.redirect('/login');

        const usuario = await usuarioModel.obtenerUsuarioPorId(id_usuario);
        if (!usuario) {
            return res.status(404).render('error', { title: 'Error', message: 'Usuario no encontrado' });
        }

        res.render('pages/home/perfil', {
            title: 'Mi Perfil',
            usuario,
            errors: []
        });
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar el perfil'
        });
    }
};



exports.actualizarPerfil = async (req, res) => {
    try {
        const id_usuario = req.user?.id_usuario;

        if (!id_usuario) {
            return res.redirect('/login');
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const usuario = await usuarioModel.obtenerUsuarioPorId(id_usuario);
            return res.render('pages/home/perfil', {
                title: 'Mi Perfil',
                usuario,
                errors: errors.array(),
                success: null
            });
        }

        // Actualizar solo los datos del perfil (sin contraseña ni rol)
        await usuarioModel.actualizarPerfilUsuario(id_usuario, req.body);

        const usuarioActualizado = await usuarioModel.obtenerUsuarioPorId(id_usuario);

        res.render('pages/home/perfil', {
            title: 'Mi Perfil',
            usuario: usuarioActualizado,
            errors: [],
            success: '¡Perfil actualizado exitosamente!'
        });

    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Hubo un error al actualizar el perfil del usuario.'
        });
    }
};
