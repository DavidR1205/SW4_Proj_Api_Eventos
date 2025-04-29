const db = require('../config/database');

class Artista {
    static async obtenerArtistas() {
        try {
            const [artistas] = await db.query('SELECT * FROM artista');
            return artistas;
        } catch (error) {
            console.error('Error al obtener informacion de los Artistas', error);
            throw error;   
        }
    }

    static async obtenerArtistaId(id) {
        try {
            const [artistas] = await db.query('SELECT * FROM artista WHERE id_artista = ?', {id});
            return artistas[0];
        } catch (error) {
            console.error('Error al obtener informacion del Artista por Id: ', error);
            throw error;
        }
    }
}

module.exports = Artista;