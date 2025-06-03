const pool = require('../config/database');

class Compra {
    static async obtenerCompras() {
        try {
            const [compras] = await pool.query('SELECT * FROM compra');
            return compras;
        } catch (error) {
            console.error('Error al obtener las compras:', error);
            throw error;
        }
    }

    static async obtenerCompraPorId(id) {
        try {
            const [compra] = await pool.query('SELECT * FROM compra WHERE id_compra = ?', [id]);
            return compra[0];
        } catch (error) {
            console.error('Error al obtener la compra por ID:', error);
            throw error;
        }
    }

    static async actualizarCompra(id, compra) {
        try {
            const {
                cantidad_boletas,
                valor_pago,
                id_usuario,
                id_boleta
            } = compra;

            const [result] = await pool.query(
                `UPDATE compra SET
                    cantidad_boletas = ?, valor_pago = ?, id_usuario = ?, id_boleta = ?
                WHERE id_compra = ?`,
                [cantidad_boletas, valor_pago, id_usuario, id_boleta]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la compra:', error);
            throw error;
        }
    }

    static async eliminarCompra(id) {
        try {
            const [result] = await pool.query('DELETE FROM compra WHERE id_compra = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar la compra:', error);
            throw error;
        }
    }
}

module.exports = Compra;