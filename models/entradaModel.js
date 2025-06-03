const pool = require('../config/database');

class Entrada {
    static async obtenerEntradas(id_usuario) {
        try {
            const [entradas] = await pool.query(`
            SELECT 
                e.id_entrada,
                ev.nombre_evento,
                ev.fecha_inicio_evento,
                ev.hora_inicio_evento,
                ev.lugar_evento,
                ev.ciudad_evento,
                b.localidad_boleta,
                b.tipo_boleta
            FROM entrada e
            INNER JOIN boletas b ON e.id_boleta = b.id_boleta
            INNER JOIN evento ev ON b.id_evento = ev.id_evento
            WHERE e.id_usuario = ?  
            `, [id_usuario]);
            return entradas;
        } catch (error) {
            console.error('Error al obtener informacion de las Entradas: ', error);
            throw error;
        }
    }

}

module.exports = Entrada;