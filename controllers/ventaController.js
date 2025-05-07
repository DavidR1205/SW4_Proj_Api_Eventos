const { validationResult } = require('express-validator');
const ventaModel = require('../models/ventaModel');

exports.listarVentas = async (req, res) => {
    try {
        const ventas = await ventaModel.obtenerVentas();
        res.status(200).json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar las ventas' });
    }
};

exports.agregarVenta = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        const id = await ventaModel.crearVenta(req.body);
        res.status(201).json({ message: 'Venta creada con éxito', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la venta' });
    }
};

exports.editarVenta = async (req, res) => {
    try {
        const venta = await ventaModel.obtenerVentaPorId(req.params.id);
        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.status(200).json(venta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los datos de la venta' });
    }
};

exports.actualizarVenta = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: errors.array()
        });
    }

    try {
        const success = await ventaModel.actualizarVenta(req.params.id, req.body);
        if (!success) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.status(200).json({ message: 'Venta actualizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la venta' });
    }
};

exports.eliminarVenta = async (req, res) => {
    try {
        const success = await ventaModel.eliminarVenta(req.params.id);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Venta no encontrada' });
        }
        res.status(200).json({ message: 'Venta eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar la venta' });
    }
};