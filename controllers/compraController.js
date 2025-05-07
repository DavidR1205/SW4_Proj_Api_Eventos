const { validationResult } = require('express-validator');
const compraModel = require('../models/compraModel');

exports.listarCompras = async (req, res) => {
    try {
        const compras = await compraModel.obtenerCompras();
        res.status(200).json(compras);
    } catch (error) {
        console.error('Error al listar las compras:', error);
        res.status(500).json({ message: 'Error al cargar las compras' });
    }
};

exports.agregarCompra = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array(),
        });
    }

    try {
        const id = await compraModel.crearCompra(req.body);
        res.status(201).json({ message: 'Compra creada con éxito', id });
    } catch (error) {
        console.error('Error al agregar la compra:', error);
        res.status(500).json({ message: 'Error al crear la compra' });
    }
};

exports.editarCompra = async (req, res) => {
    try {
        const compra = await compraModel.obtenerCompraPorId(req.params.id);
        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json(compra);
    } catch (error) {
        console.error('Error al obtener la compra:', error);
        res.status(500).json({ message: 'Error al cargar los datos de la compra' });
    }
};

exports.actualizarCompra = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array(),
        });
    }

    try {
        const success = await compraModel.actualizarCompra(req.params.id, req.body);
        if (!success) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json({ message: 'Compra actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar la compra:', error);
        res.status(500).json({ message: 'Error al actualizar la compra' });
    }
};

exports.eliminarCompra = async (req, res) => {
    try {
        const success = await compraModel.eliminarCompra(req.params.id);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Compra no encontrada' });
        }
        res.status(200).json({ message: 'Compra eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la compra:', error);
        res.status(500).json({ success: false, message: 'Error al eliminar la compra' });
    }
};