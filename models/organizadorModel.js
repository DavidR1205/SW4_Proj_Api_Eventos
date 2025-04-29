const db = require('../config/database');

class Organizador {
    static async obtenerOrganizadores() {
        try {
            const [organizadores] = await db.query('SELECT * FROM organizador');
            return organizadores;
        } catch (error) {
            console.error('Error al obtener la informacion de los Organizadores: ', error);
            throw error;
        }
    }

    static async obtenerOrganizadoresId(id) {
        try {
            const [organizadores] = await db.query('SELECT * FROM organizador WHERE id_organizador = ?', {id});
            return organizadores[0];
        } catch (error) {
            console.error('Error al obtener informacionde los Organizadores por Id: ', error);
            throw error;
        }
    }
}