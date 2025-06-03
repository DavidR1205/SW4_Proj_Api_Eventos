const { validationResult } = require('express-validator');
const ventaModel = require('../models/ventaModel');
const compraModel = require('../models/compraModel'); 


exports.listarVentas = async (req, res) => {
    try {
        const ventas = await ventaModel.obtenerVentas();
        res.render('pages/admin/ventas/index', {
            title: 'Ventas',
            ventas
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar las ventas' });
    }
};

exports.formVenta = async (req, res) => {
    try {
        const compras = await compraModel.obtenerCompras();
        res.render('pages/admin/ventas/form', {
            title: 'Venta',
            venta: {},
            compras,
            errors: [],
            isEditing: false
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar el formulario' });
    }
};

/*exports.agregarVenta = async (req, res) => {
    const errors = validationResult(req);
    const compras = await compraModel.obtenerCompras();

    if (!errors.isEmpty()) {
        return res.render('pages/admin/ventas/form', {
            title: 'Venta',
            venta: req.body,
            compras,
            errors: errors.array(),
            isEditing: false
        });
    }
    try {
        await ventaModel.crearVenta(req.body);
        res.redirect('/admin/ventas');
    } catch (error) {
        res.render('pages/admin/ventas/form', {
            title: 'Venta',
            venta: req.body,
            compras,
            errors: [{ message: 'Error al crear la venta. Revise los campos.' }],
            isEditing: false
        });
    }
};*/

exports.editarVenta = async (req, res) => {
    try {
        const venta = await ventaModel.obtenerVentaPorId(req.params.id);
        const compras = await compraModel.obtenerCompras();

        if (!venta) {
            return res.status(404).render('error', { title: 'Error', message: 'Venta no encontrada' });
        }
        res.render('pages/admin/ventas/form', {
            title: 'Venta',
            venta,
            compras,
            errors: [],
            isEditing: true
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar los datos de la venta' });
    }
};

exports.actualizarVenta = async (req, res) => {
    const errors = validationResult(req);
    const compras = await compraModel.obtenerCompras();

    if (!errors.isEmpty()) {
        return res.render('pages/admin/ventas/form', {
            title: 'Venta',
            venta: { ...req.body, id_venta: req.params.id },
            compras,
            errors: errors.array(),
            isEditing: true
        });
    }
    try {
        const success = await ventaModel.actualizarVenta(req.params.id, req.body);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Venta no encontrada' });
        }
        res.redirect('/admin/ventas');
    } catch (error) {
        res.render('pages/admin/ventas/form', {
            title: 'Venta',
            venta: { ...req.body, id_venta: req.params.id },
            compras,
            errors: [{ message: 'Error al actualizar la venta' }],
            isEditing: true
        });
    }
};

exports.eliminarVenta = async (req, res) => {
    try {
        const success = await ventaModel.eliminarVenta(req.params.id);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Venta no encontrada' });
        }
        res.redirect('/admin/ventas');
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al eliminar la venta' });
    }
};
