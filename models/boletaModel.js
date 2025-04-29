const db = require('../config/database');

class Boleta {
    static async obtenerBoletas() {
        try {
            const [boletas] = await db.query('SELECT * FROM boleta');
            return boletas;
        } catch (error) {
            console.error('Error al obtener las Boletas: ', error);
            throw error;
        }
    }

    static async obtenerBoletaId(id) {
        try {
            const [boletas] = await db.query('SELECT * FROM boleta WHERE id_boleta = ?', {id});
            return boletas[0];
        } catch (error) {
            console.error('Error al obtener informacion de la Boleta por Id: ', error);
            throw error;
        }
    }
}