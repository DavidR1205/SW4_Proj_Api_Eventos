const { validationResult } = require('express-validator');
const eventoModel = require('../models/eventoModel');

exports.listarEventos = async(req, res) => {
    try {
        const eventos = await eventoModel.obtenerEventos();
        res.json(eventos);
        /*res.render('eventos/index', {
            eventos
        })*/
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los eventos'
        }); 
    }
};

exports.formEvento = async(req, res) => {
    res.render('eventos/form', {
        title: 'Registrar Evento',
        evento: {},
        errors: [],
        isEditing: false
    });
};

exports.agregarEvento = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(500).json({ message: 'Error en validacion', errors})
        /*return res.render('eventos/form', {
            title: 'Registrar Evento',
            evento: req.body,
            errors: errors.array(),
            isEditing: false
        });*/
    }

    try {
        await eventoModel.crearEvento(req.body)
        res.redirect('/eventos');
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al crear el evento', error});
        /*res.render('eventos/form', {
            title: 'Registrar Evento',
            evento: req.body,
            errors: [{message: 'Error al crear el evento. Revise de nuevo los campos ingresados.'}],
            isEditing: false
        });*/
    }
};

exports.editarEvento = async (req, res) => {
    try {
        const evento = await eventoModel.obtenerEventosId(req.params.id)
        if (!evento) {
            return res.status(404).json({message: 'Evento no encontrado'})/*render('error', {
                title: 'Error',
                message: 'Evento no encontrado'
            });*/
        }
        res.status(200).json(evento)
        /*res.render('eventos/form', {
            title: 'Editar Evento',
            evento,
            errors: [],
            isEditing: true
        });*/
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los datos del evento'})
        /*res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los datos del evento'
        });*/
    }
};

exports.actualizarEvento = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: 'Error en la validacion',
            errors: errors.array()
        })
        /*return res.render('eventos/form', {
            title: 'Editar Evento',
            evento: { ...req.body, id: req.params.id},
            errors: errors.array(),
            isEditing: true
        });*/
    }

    try {
        const success = await eventoModel.actualizarEvento(req.params.id, req.body);
        if (!success) {
            return res.status(404).json({message: 'Evento no encontrado'});
            /*return res.status(404).render('error', {
                title: 'Error',
                message: 'Evento no encontrado'
            });*/
        }
        res.status(200).json({ message: 'Evento actualizado con exito' });
        //res.redirect('/eventos')
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el Evento' });
        /*res.render('eventos/form', {
            title: 'Editar Evento',
            evento: {...req.body, id: req.params.id},
            errors: [{ message: 'Error al actualizar el evento' }],
            idEditing: true
        });*/
    }
};

exports.eliminarEvento = async (req, res) => {
    try {
        const success = await  eventoModel.eliminarEvento(req.params.id);
        if (!success) {
            return res.status(404).json( {success: false, message: 'Evento no encontrado'});
        }
        res.redirect('/eventos')
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar el Evento' });
    }
};