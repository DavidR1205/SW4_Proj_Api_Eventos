const pool = require('../config/database');

class Venta {
    static async obtenerVentas() {
        try {
            const [ventas] = await pool.query('SELECT * FROM venta');
            return ventas;
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
            throw error;
        }
    }

    static async obtenerVentaPorId(id) {
        try {
            const [venta] = await pool.query('SELECT * FROM venta WHERE id_venta = ?', [id]);
            return venta[0];
        } catch (error) {
            console.error('Error al obtener la venta por ID:', error);
            throw error;
        }
    }

    static async crearVenta(venta) {
        try {
            const { valor_venta, fecha_venta, metodo_pago, id_compra } = venta;
            const [result] = await pool.query(
                `INSERT INTO venta (valor_venta, fecha_venta, metodo_pago, id_compra)
                VALUES (?, ?, ?, ?)`,
                [valor_venta, fecha_venta, metodo_pago, id_compra]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al crear la venta:', error);
            throw error;
        }
    }

    static async actualizarVenta(id, venta) {
        try {
            const { valor_venta, fecha_venta, metodo_pago, id_compra } = venta;
            const [result] = await pool.query(
                `UPDATE venta SET valor_venta = ?, fecha_venta = ?, metodo_pago = ?, id_compra = ?
                WHERE id_venta = ?`,
                [valor_venta, fecha_venta, metodo_pago, id_compra, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
            throw error;
        }
    }

    static async eliminarVenta(id) {
        try {
            const [result] = await pool.query('DELETE FROM venta WHERE id_venta = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar la venta:', error);
            throw error;
        }
    }
}

module.exports = Venta;