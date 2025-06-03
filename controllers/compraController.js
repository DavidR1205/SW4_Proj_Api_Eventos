const { validationResult } = require('express-validator');
const compraModel = require('../models/compraModel');
const usuarioModel = require('../models/usuarioModel');
const boletaModel = require('../models/boletaModel');

exports.listarCompras = async (req, res) => {
    try {
        const compras = await compraModel.obtenerCompras();
        res.render('pages/admin/compras/index', {
            title: 'Compras',
            compras
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar las compras' });
    }
};

exports.formCompra = async (req, res) => {
    try {
        const usuarios = await usuarioModel.obtenerUsuarios();
        const boletas = await boletaModel.obtenerBoletas();

        res.render('pages/admin/compras/form', {
            title: 'Compra',
            compra: {},
            errors: [],
            isEditing: false,
            usuarios,
            boletas
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar el formulario de compra' });
    }
};

exports.agregarCompra = async (req, res) => {
    const errors = validationResult(req);
    const usuarios = await usuarioModel.obtenerUsuarios();
    const boletas = await boletaModel.obtenerBoletas();

    if (!errors.isEmpty()) {
        return res.render('pages/admin/compras/form', {
            title: 'Compra',
            compra: req.body,
            errors: errors.array(),
            isEditing: false,
            usuarios,
            boletas
        });
    }

    try {
        await compraModel.crearCompra(req.body);
        res.redirect('/admin/compras');
    } catch (error) {
        res.render('pages/admin/compras/form', {
            title: 'Compra',
            compra: req.body,
            errors: [{ message: 'Error al crear la compra. Revise los campos.' }],
            isEditing: false,
            usuarios,
            boletas
        });
    }
};

exports.editarCompra = async (req, res) => {
    try {
        const compra = await compraModel.obtenerCompraPorId(req.params.id);
        const usuarios = await usuarioModel.obtenerUsuarios();
        const boletas = await boletaModel.obtenerBoletas();

        if (!compra) {
            return res.status(404).render('error', { title: 'Error', message: 'Compra no encontrada' });
        }

        res.render('pages/admin/compras/form', {
            title: 'Compra',
            compra,
            errors: [],
            isEditing: true,
            usuarios,
            boletas
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar los datos de la compra' });
    }
};

exports.actualizarCompra = async (req, res) => {
    const errors = validationResult(req);
    const usuarios = await usuarioModel.obtenerUsuarios();
    const boletas = await boletaModel.obtenerBoletas();

    if (!errors.isEmpty()) {
        return res.render('pages/admin/compras/form', {
            title: 'Compra',
            compra: { ...req.body, id_compra: req.params.id },
            errors: errors.array(),
            isEditing: true,
            usuarios,
            boletas
        });
    }

    try {
        const success = await compraModel.actualizarCompra(req.params.id, req.body);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Compra no encontrada' });
        }

        res.redirect('/admin/compras');
    } catch (error) {
        res.render('pages/admin/compras/form', {
            title: 'Compra',
            compra: { ...req.body, id_compra: req.params.id },
            errors: [{ message: 'Error al actualizar la compra' }],
            isEditing: true,
            usuarios,
            boletas
        });
    }
};

exports.eliminarCompra = async (req, res) => {
    try {
        const success = await compraModel.eliminarCompra(req.params.id);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Compra no encontrada' });
        }
        res.redirect('/admin/compras');
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al eliminar la compra' });
    }
};
