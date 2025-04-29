const db = require('../config/database');

class Venta {
    static async obtenerVentas() {
        try {
            const [ventas] = await db.query('SELECT * FROM venta');
            return ventas;
        } catch (error) {
            console.error('Error al obtener informacion de las ventas', error);
            throw error;
        }
    }
}