const { validationResult } = require('express-validator');
const eventoModelIndex = require('../models/eventoModel');

exports.listarEventosIndex = async (req, res) => {
    try {
        const eventos = await eventoModelIndex.obtenerEventos();
        res.render('pages/home/index', {
            eventos
        })
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los eventos'
        });
    }
};

exports.showEventoIndex = async (req, res) => {
    try {
        const evento = await eventoModelIndex.obtenerEventosId(req.params.id);
        if (!evento) {
            return res.status(400).render('error', {
                title: 'error',
                message: 'Evento no encontrado'
            });
        };

        res.render('pages/home/show', {
            evento
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los datos del evento'
        });
    }
}