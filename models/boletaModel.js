const pool = require('../config/database');
class Boleta {
    static async obtenerBoletas() {
        try {
            const [boletas] = await pool.query('SELECT * FROM boletas');
            return boletas;
        } catch (error) {
            console.error('Error al obtener las Boletas: ', error);
            throw error;
        }
    }

    static async obtenerBoletaId(id) {
        try {
            const [boletas] = await pool.query('SELECT * FROM boletas WHERE id_boleta = ?', [id]);
            return boletas[0];
        } catch (error) {
            console.error('Error al obtener informacion de la Boleta por Id: ', error);
            throw error;
        }
    }

    static async crearBoleta(boleta) {
        try {
            const { precio_boleta, tipo_boleta, localidad_boleta, num_personas, id_evento } = boleta;
            const [result] = await pool.query(
                `INSERT INTO boletas (precio_boleta, tipo_boleta, localidad_boleta, num_personas, id_evento)
                VALUES (?, ?, ?, ?, ?)`, [precio_boleta, tipo_boleta, localidad_boleta, num_personas, id_evento]
            );
            return result.insertId;   
        } catch (error) {
            console.error('Error al crear la boleta: ', error);
            throw error;
        }
    }

    static async actualizarBoleta(id, boleta) {
        try {
            const { precio_boleta, tipo_boleta, localidad_boleta, num_personas, id_evento } = boleta;
            const [result] = await pool.query(
                `UPDATE boletas SET precio_boleta = ?, tipo_boleta = ?, localidad_boleta = ?, num_personas = ?,
                id_evento = ? WHERE id_boleta = ?`,
                [precio_boleta, tipo_boleta, localidad_boleta, num_personas, id_evento, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la boleta: ', error);
            throw error;
        }
    }

    static async eliminarBoleta(id) {
        try {
            const [result] = await pool.query('DELETE FROM boletas WHERE id_boleta = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar la Boleta: ', error);
        }
    }
}

module.exports = Boleta;