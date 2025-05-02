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

exports.formArtista = (req, res) => {
    res.render('artista/form');
};

exports.agregarArtista = async (req, res) => {
    const { nombre_artista, genero_musical } = req.body;
    try {
        await artistaModel.crearArtista(nombre_artista, genero_musical);
        res.redirect('/artistas')
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al crear el Artista');
    }
}
