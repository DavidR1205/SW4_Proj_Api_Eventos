const { validationResult } = require('express-validator');
const rolModel = require('../models/rolModel');

exports.listarRoles = async (req, res) => {
    try {
        const roles = await rolModel.obtenerRoles();
        res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los roles' });
    }
};

exports.agregarRol = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        await rolModel.crearRol(req.body);
        res.status(201).json({ message: 'Rol creado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el rol' });
    }
};

exports.editarRol = async (req, res) => {
    try {
        const rol = await rolModel.obtenerRolId(req.params.id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los datos del rol' });
    }
};

exports.actualizarRol = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        const success = await rolModel.actualizarRol(req.params.id, req.body);
        if (!success) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el rol' });
    }
};

exports.eliminarRol = async (req, res) => {
    try {
        const success = await rolModel.eliminarRol(req.params.id);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar el rol' });
    }
};