const { validationResult } = require('express-validator');
const artistaModel = require('../models/artistaModel')

//Mostrar Lista de Artistas
exports.listarArtistas = async (req, res) => {
    try {
        const artistas = await artistaModel.obtenerArtistas();
        res.render('pages/admin/artista/index', { 
            title: "Artistas",
            artistas 
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los estudiantes'
        });
    }
};

//Mostrar Formulario
exports.formArtista = (req, res) => {
    res.render('pages/admin/artista/form', {
        title: 'Artista',
        artista: {},
        errors: [],
        isEditing: false
    });
};

//Guardar Artista
exports.agregarArtista = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/artista/form', {
            title: 'Artista',
            artista: req.body,
            errors: errors.array(),
            isEditing: false
        });
    }

    try {
        await artistaModel.crearArtista(req.body);
        res.redirect('/admin/artista');
    } catch (error) {
        console.error(error);
        res.render('artista/form', {
            title: 'Artista',
            artista: req.body,
            errors: [{ message: 'Error al crear el artista. Revise de nuevo los campos ingresados.' }],
            isEditing: false
        });
    }
};

//Mostrar formulario para editar artista
exports.editarArtista = async (req, res) => {
    try {
        const artista = await artistaModel.obtenerArtistaId(req.params.id);
        if (!artista) {
            return res.status(404).render('error', {
                title: 'Error',
                message: 'Artista no encontrado'
            });
        }
        res.render('pages/admin/artista/form', {
            title: 'Artista',
            artista,
            errors: [],
            isEditing: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los datos del artista'
        });
    }
};

//Actualizar artista
exports.actualizarArtista = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/admin/artista/form', {
            title: 'Artista',
            artista: { ...req.body, id: req.params.id},
            errors: errors.array(),
            isEditing: true
        });
    }

    try {
        const success = await artistaModel.actualizarArtista(req.params.id, req.body);
        if (!success) {
            return res.status(404).render('error', {
                title: 'Error',
                message: 'Artista no encontrado'
            });
        }
        res.redirect('/admin/artista');
    } catch (error) {
        console.error(error);
        res.render('pages/admin/artista/form', {
            title: 'Artista',
            artista: { ...req.body, id: req.params.id },
            errors: [{ message: 'Error al actualizar el artista' }],
            isEditing: true
        });
    }
};

//Eliminar Artista
exports.eliminarArtista = async (req, res) => {
    try {
        const success = await artistaModel.eliminarArtista(req.params.id);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Artista no encontrado' });
        }
        res.redirect('/admin/artista')
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar el Artista' });
    }
};