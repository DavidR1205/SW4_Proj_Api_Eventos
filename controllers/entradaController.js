const entradaModel = require('../models/entradaModel');

exports.verEntradas = async (req, res) => {
    try {
        const id_usuario = req.user.id_usuario;

        const entradas = await entradaModel.obtenerEntradas(id_usuario);

        res.render('pages/home/entradas', {
            entradas
        });
    } catch (error) {
        console.error('Error al obtener entradas:', error);
        res.status(500).send('Error al cargar las entradas');
    }
}