const db = require('../config/database');

class Evento {
    static async obtenerEventos() {
        try {
            const [eventos] = await db.query('SELECT * FROM evento');
            return eventos;
        } catch (error) {
            console.error('Error al obtener informacion de los Eventos: ', error);
            throw error;
        }
    }

    static async obtenerEventosId(id) {
        try {
            const [eventos] = await db.query('SELECT * FROM eventos WHERE id_evento = ?', {id});
            return eventos[0];
        } catch (error) {
            console.error('Error al obtener informacion de los Eventos por Id: ', error);
            throw error;
        }
    }
}