const artistaModel = require('../models/artistaModel')

exports.listarArtistas = async (req, res) => {
    try {
        const artistas = await artistaModel.obtenerArtistas();
        res.render('artista/index', { artistas });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los Artistas');
    }
};