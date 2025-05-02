const pool = require('../config/database');

class Artista {
    static async obtenerArtistas() {
        try {
            const [artistas] = await pool.query('SELECT * FROM artista');
            return artistas;
        } catch (error) {
            console.error('Error al obtener informacion de los Artistas', error);
            throw error;   
        }
    }

    static async obtenerArtistaId(id) {
        try {
            const [artistas] = await pool.query('SELECT * FROM artista WHERE id_artista = ?', [id]);
            return artistas[0];
        } catch (error) {
            console.error('Error al obtener informacion del Artista por Id: ', error);
            throw error;
        }
    }

    static async crearArtista(artista) {
        try {
            const { nombre_artista, genero_musical } = artista;
            const [result] = await pool.query(
                'INSERT INTO artista (nombre_artista, genero_musical) VALUES (?, ?)',
                [nombre_artista, genero_musical]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al crear artista: ', error);
            throw error;
        }
    }

    static async actualizarArtista(id, artista) {
        try {
            const { nombre_artista, genero_musical } = artista;
            const [result] = await pool.query(
                'UPDATE artista SET nombre_artista = ?, genero_musical = ? WHERE id_artista = ?',
                [nombre_artista, genero_musical, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error(`Error al actualizar el artista`, error);
            throw error;
        }
    }

    static async eliminarArtista(id) {
        try {
            const [result] = await pool.query('DELETE FROM artista WHERE id_artista = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el artistsa: ', error);
            throw error;
        }
    }
}

module.exports = Artista;