const { validationResult } = require('express-validator');
const boletaModel = require('../models/boletaModel');
const eventoModel = require('../models/eventoModel');

exports.listarBoletas = async(req, res) => {
    try {
        const boletas = await boletaModel.obtenerBoletas();
        res.render('pages/admin/boletas/index', {
            title: 'Boletas',
            boletas
        })
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar las boletas'
        });       
    } 
}

exports.formBoletas = async (req, res) => {
    const evento = await eventoModel.obtenerEventos();
    res.render('pages/admin/boletas/form', {
        title: 'Registrar Boleta',
        boleta: {},
        errors: [],
        isEditing: false,
        evento
    });
}

exports.agregarBoleta = async (req, res) => {
    const errors = validationResult(req);
    const evento = await eventoModel.obtenerEventos();
    if (!errors.isEmpty()) {
        return res.render('pages/admin/boletas/form', {
            title: 'Registrar Boleta',
            boleta: req.body,
            errors: errors.array(),
            isEditing: false,
            evento
        });
    }

    try {
        await boletaModel.crearBoleta(req.body);
        res.redirect('/admin/boletas');
    } catch (error) {
        console.error(error);
        res.render('pages/admin/boletas/form', {
            title: 'Registrar Boletas',
            boletas: req.body,
            errors: [{message: 'Error al crear la boleta. Revise de nuevo los campos ingresados.'}],
            isEditing: false,
            evento
        });
    }
};

exports.editarBoleta = async (req, res) => {
    try {
        const boleta = await boletaModel.obtenerBoletaId(req.params.id);
        const evento = await eventoModel.obtenerEventos();
        if (!boleta) {
            return res.status(404).render('error', {
                title: 'Error',
                message: 'Boleta no encontrada'
            });
        }
        res.render('pages/admin/boletas/form', {
            title: 'Editar Boleta',
            boleta,
            errors: [],
            isEditing: true,
            evento
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los datos de la boleta'
        });
    }
};

exports.actualizarBoleta = async (req, res) => {
    const errors = validationResult(req);
    const evento = await eventoModel.obtenerEventos();
    if (!errors.isEmpty()) {
        return res.render('pages/admin/boletas/form', {
            title: 'Editar Boleta',
            boleta: { ...req.body, id_boleta: req.params.id},
            errors: errors.array(),
            isEditing: true,
            evento
        });
    }

    try {
        const success = await boletaModel.actualizarBoleta(req.params.id, req.body);
        if (!success) {
            return res.status(404).render('error', {
                title: 'Error',
                message: 'Boleta no encontrada'
            });
            
        }
        res.redirect('/admin/boletas')
    } catch (error) {
        console.error(error);
        res.render('pages/admin/boletas/form', {
            title: 'Editar Boleta',
            boleta: {...req.body, id: req.params.id},
            errors: [{ message: 'Error al actualizar la boleta' }],
            isEditing: true,
            evento
        });
    }
};

exports.eliminarBoleta = async (req, res) => {
    try {
        const success = await  boletaModel.eliminarBoleta(req.params.id);
        if (!success) {
            return res.status(404).json( {success: false, message: 'Boleta no encontrada'});
        }
        res.redirect('/admin/boletas')
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar la Boleta' });
    }
};