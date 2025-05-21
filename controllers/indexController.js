const { validationResult } = require('express-validator');
const eventoModelIndex = require('../models/eventoModel');

exports.listarEventosIndex = async(req, res) => {
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