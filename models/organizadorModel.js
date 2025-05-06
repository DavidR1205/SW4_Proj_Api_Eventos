const pool = require('../config/database');

class Organizador {
    static async obtenerOrganizadores() {
        try {
            const [organizadores] = await pool.query('SELECT * FROM organizador');
            return organizadores;
        } catch (error) {
            console.error('Error al obtener la informacion de los Organizadores: ', error);
            throw error;
        }
    }

    static async obtenerOrganizadoresId(id) {
        try {
            const [organizadores] = await pool.query('SELECT * FROM organizador WHERE id_organizador = ?', [id]);
            return organizadores[0];
        } catch (error) {
            console.error('Error al obtener informacion de los Organizadores por Id: ', error);
            throw error;
        }
    }

    static async crearOrganizador(organizador) {
        try {
            const { nombre_organizador, tipo_documento, numero_documento, direccion } = organizador;
            const [result] = await pool.query(
                'INSERT INTO organizador (nombre_organizador, tipo_documento, numero_documento, direccion) VALUES (?, ?, ?, ?)',
                [nombre_organizador, tipo_documento, numero_documento, direccion]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al crear el organizador: ', error);
            throw error;
        }
    }

    static async actualizarOrganizador(id, organizador) {
        try {
            const { nombre_organizador, tipo_documento, numero_documento, direccion } = organizador;
            const [result] = await pool.query(
                'UPDATE organizador SET nombre_organizador = ?, tipo_documento = ?, numero_documento = ?, direccion = ? WHERE id_organizador = ?',
                [nombre_organizador, tipo_documento, numero_documento, direccion, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el organizador', error);
            throw error;
        }
    }

    static async eliminarOrganizador(id) {
        try {
            const [result] = await pool.query('DELETE FROM organizador WHERE id_organizador = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al elminar el Organizador: ', error);
            throw error;
        }
    }
}

module.exports = Organizador;