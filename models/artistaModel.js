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

    static async crearArtista(nombre_artista, genero_musical) {
        try {
            const [artistas] = await db.query('INSERT INTO artista (nombre_artista, genero_muscial) VALUES (?,?)', {nombre_artista, genero_musical});
            return artistas;
        } catch (error) {
            console.error('Error al crear el Artista: ', error);
            throw error;
        }
    }

}

module.exports = Artista;