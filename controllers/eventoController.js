const { validationResult } = require('express-validator');
const eventoModel = require('../models/eventoModel');

exports.listarEventos = async (req, res) => {
    try {
        const eventos = await eventoModel.obtenerEventos();
        res.render('pages/admin/eventos/index', {
            title: 'Eventos',
            eventos
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar los eventos' });
    }
};

exports.formEvento = (req, res) => {
    res.render('pages/admin/eventos/form', {
        title: 'Evento',
        evento: {},
        errors: [],
        isEditing: false
    });
};

exports.agregarEvento = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/eventos/form', {
            title: 'Evento',
            evento: req.body,
            errors: errors.array(),
            isEditing: false
        });
    }
    try {
        await eventoModel.crearEvento(req.body);
        res.redirect('/admin/eventos');
    } catch (error) {
        res.render('pages/admin/eventos/form', {
            title: 'Evento',
            evento: req.body,
            errors: [{ message: 'Error al crear el evento. Revise los campos.' }],
            isEditing: false
        });
    }
};

exports.editarEvento = async (req, res) => {
    try {
        const evento = await eventoModel.obtenerEventosId(req.params.id);
        if (!evento) {
            return res.status(404).render('error', { title: 'Error', message: 'Evento no encontrado' });
        }
        res.render('pages/admin/eventos/form', {
            title: 'Evento',
            evento,
            errors: [],
            isEditing: true
        });
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al cargar los datos del evento' });
    }
};

exports.actualizarEvento = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/eventos/form', {
            title: 'Evento',
            evento: { ...req.body, id_evento: req.params.id },
            errors: errors.array(),
            isEditing: true
        });
    }
    try {
        const success = await eventoModel.actualizarEvento(req.params.id, req.body);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Evento no encontrado' });
        }
        res.redirect('/admin/eventos');
    } catch (error) {
        res.render('pages/admin/eventos/form', {
            title: 'Evento',
            evento: { ...req.body, id_evento: req.params.id },
            errors: [{ message: 'Error al actualizar el evento' }],
            isEditing: true
        });
    }
};

exports.eliminarEvento = async (req, res) => {
    try {
        const success = await eventoModel.eliminarEvento(req.params.id);
        if (!success) {
            return res.status(404).render('error', { title: 'Error', message: 'Evento no encontrado' });
        }
        res.redirect('/admin/eventos');
    } catch (error) {
        res.status(500).render('error', { title: 'Error', message: 'Error al eliminar el evento' });
    }
};