const { validationResult } = require('express-validator');
const usuarioModel = require('../models/usuarioModel');


exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los usuarios' });
    }
};



exports.agregarUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        await usuarioModel.crearUsuario(req.body);
        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};



exports.editarUsuario = async (req, res) => {
    try {
        const usuario = await usuarioModel.obtenerUsuarioPorId(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los datos del usuario' });
    }
};




exports.actualizarUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        const success = await usuarioModel.actualizarUsuario(req.params.id, req.body);
        if (!success) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};
exports.eliminarUsuario = async (req, res) => {
    try {
        const success = await usuarioModel.eliminarUsuario(req.params.id);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar el usuario' });
    }
};
