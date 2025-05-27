const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usuarioModel = require('../models/usuarioModel');
const JWT_SECRET = 'tu_clave_secreta'; // Usa variable de entorno en producción

exports.showLogin = (req, res) => {
    res.render('pages/home/login', {
        error: null,
        user: req.user || null // Esto permite que la vista sepa si hay usuario autenticado
    });
};

exports.login = async (req, res) => {
    const { correo_electronico, contrasena } = req.body;
    try {
        const usuario = await usuarioModel.obtenerUsuarioPorCorreo(correo_electronico);
        if (!usuario) {
            return res.render('pages/home/login', { error: 'Credenciales inválidas' });
        }
        const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!passwordMatch) {
            return res.render('pages/home/login', { error: 'Credenciales inválidas' });
        }
        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                correo_electronico: usuario.correo_electronico,
                nombre: usuario.primer_nombre,
                rol: usuario.id_rol
            },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('pages/home/login', { error: 'Error en el servidor' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

exports.formRegister = (req, res) => {
    res.render('pages/home/registrar', {
        errors: [],
        user: req.user || null // Esto permite que la vista sepa si hay usuario autenticado
    });
}

exports.register = async (req, res) => {
    try {
        const usuario = req.body;

        const existente = await usuarioModel.obtenerUsuarioPorCorreo(usuario.correo_electronico);
        if (existente) {
            return res.render('pages/home/registrar', {
                errors: [{ msg: 'Ya existe una cuenta registrada con este correo.' }],
                user: null
            });
        }

        await usuarioModel.RegistrarUsuarioIndex(usuario);

        res.redirect('/login');

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.render('pages/home/registrar', {
            errors: [{ msg: 'Ocurrió un error al registrar. Intenta más tarde.' }],
            user: null
        });
    }
}
