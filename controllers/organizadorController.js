const { validationResult } = require('express-validator');
const organizadorModel = require('../models/organizadorModel');

exports.listarOrganizadores = async(req, res) => {
    try {
        const organizadores = await organizadorModel.obtenerOrganizadores();
        res.render('organizador/index', {
            organizadores
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los organizadores'
        });   
    }
}