const db = require('../config/database');

class Compra {
    static async obtenerCompras() {
        try {
            const [compras] = await db.query('SELECT * FROM compra');
            return compras;
        } catch (error) {
            console.error('Error al obtener las Compras: ', error);
            throw error;
        }
    }
}