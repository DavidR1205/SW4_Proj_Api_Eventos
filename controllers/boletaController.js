const { validationResult } = require('express-validator');
const boletaModel = require('../models/boletaModel');

exports.listarBoletas = async(req, res) => {
    try {
        const boletas = await boletaModel.obtenerBoletas();
        res.json(boletas);
        /*res.render('boletas/index', {
            boletas
        })*/
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar las boletas'
        });       
    }
}

exports.formBoletas = (req, res) => {
    res.render('boletas/form', {
        title: 'Registrar Boleta',
        boleta: {},
        errors: [],
        isEditing: false
    });
}

exports.agregarBoleta = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('boletas/form', {
            title: 'Registrar Boleta',
            boleta: req.body,
            errors: errors.array(),
            isEditing: false
        });
    }

    try {
        await boletaModel.crearBoleta(req.body);
        res.redirect('/boletas');
    } catch (error) {
        console.error(error);
        res.render('boletas/form', {
            title: 'Registrar Boletas',
            boletas: req.body,
            errors: [{message: 'Error al crear la boleta. Revise de nuevo los campos ingresados.'}],
            isEditing: false
        });
    }
};

exports.editarBoleta = async (req, res) => {
    try {
        const boleta = await boletaModel.obtenerBoletaId(req.params.id);
        if (!boleta) {
            return res.status(404).json({message: 'Boleta no encontrada'})/*render('error', {
                title: 'Error',
                message: 'Boleta no encontrada'
            });*/
        }
        res.status(200).json(boleta)
        /*res.render('boletas/form', {
            title: 'Editar Boleta',
            boleta,
            errors: [],
            isEditing: true
        });*/
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cargar los datos de la boleta'})
        /*res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar los datos de la boleta'
        });*/
    }
};

exports.actualizarBoleta = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: 'Error en la validacion',
            errors: errors.array()
        })
        /*return res.render('boleta/form', {
            title: 'Editar Boleta',
            boleta: { ...req.body, id: req.params.id},
            errors: errors.array(),
            isEditing: true
        });*/
    }

    try {
        const success = await boletaModel.actualizarBoleta(req.params.id, req.body);
        if (!success) {
            return res.status(404).json({message: 'Boleta no encontrada'});
            /*return res.status(404).render('error', {
                title: 'Error',
                message: 'Boleta no encontrada'
            });*/
        }
        res.status(200).json({ message: 'Boleta actualizada con exito' });
        //res.redirect('/boletas')
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la boleta' });
        /*res.render('boletas/form', {
            title: 'Editar Boleta',
            boleta: {...req.body, id: req.params.id},
            errors: [{ message: 'Error al actualizar la boleta' }],
            idEditing: true
        });*/
    }
};

exports.eliminarBoleta = async (req, res) => {
    try {
        const success = await  boletaModel.eliminarBoleta(req.params.id);
        if (!success) {
            return res.status(404).json( {success: false, message: 'Boleta no encontrada'});
        }
        res.redirect('/boletas')
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar la Boleta' });
    }
};