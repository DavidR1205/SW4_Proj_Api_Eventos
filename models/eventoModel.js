const pool = require('../config/database');

class Evento {
    static async obtenerEventos() {
        try {
            const [eventos] = await pool.query('SELECT * FROM evento');
            return eventos;
        } catch (error) {
            console.error('Error al obtener informacion de los Eventos: ', error);
            throw error;
        }
    }

    static async obtenerEventosId(id) {
        try {
            const [eventos] = await pool.query('SELECT * FROM evento WHERE id_evento = ?', [id]);
            return eventos[0];
        } catch (error) {
            console.error('Error al obtener informacion de los Eventos por Id: ', error);
            throw error;
        }
    }

    static async crearEvento(evento) {
        try {
            const { nombre_evento, categoria_evento, lugar_evento, ciudad_evento, departamento_evento,
                    aforo_evento, fecha_inicio_evento, fecha_fin_evento, hora_inicio_evento, hora_apertura,
                    genero_evento, edad_minima, id_artista, id_organizador} = evento;
            const [result] = await pool.query(
                `INSERT INTO evento (nombre_evento, categoria_evento, lugar_evento, ciudad_evento, departamento_evento,
                aforo_evento, fecha_inicio_evento, fecha_fin_evento, hora_inicio_evento, hora_apertura, genero_evento,
                edad_minima, id_artista, id_organizador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?)`,
                [nombre_evento, categoria_evento, lugar_evento, ciudad_evento, departamento_evento,
                    aforo_evento, fecha_inicio_evento, fecha_fin_evento, hora_inicio_evento, hora_apertura,
                    genero_evento, edad_minima, id_artista, id_organizador]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al crear el evento: ', error);
            throw error;
        }
    }

    static async actualizarEvento(id, evento) {
        try {
            const { nombre_evento, categoria_evento, lugar_evento, ciudad_evento, departamento_evento,
                aforo_evento, fecha_inicio_evento, fecha_fin_evento, hora_inicio_evento, hora_apertura,
                genero_evento, edad_minima, id_artista, id_organizador} = evento;
            const [result] = await pool.query(
                `UPDATE evento SET nombre_evento = ?, categoria_evento = ?, lugar_evento = ?, ciudad_evento = ?,
                departamento_evento = ?, aforo_evento = ?, fecha_inicio_evento = ?, fecha_fin_evento = ?, hora_inicio_evento = ?,
                hora_apertura = ?, genero_evento = ?, edad_minima = ?, id_artista = ?, id_organizador = ? 
                WHERE id_evento = ?`,
                [nombre_evento, categoria_evento, lugar_evento, ciudad_evento, departamento_evento,
                    aforo_evento, fecha_inicio_evento, fecha_fin_evento, hora_inicio_evento, hora_apertura,
                    genero_evento, edad_minima, id_artista, id_organizador, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el evento', error);
            throw error;   
        }
    }

    static async eliminarEvento(id) {
        try {
            const [result] = await pool.query('DELETE FROM evento WHERE id_evento = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el Evento: ', error);
            throw error;
        }
    }
};

module.exports = Evento;