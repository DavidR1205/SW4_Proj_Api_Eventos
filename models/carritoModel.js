const pool = require('../config/database');

class Carrito {
    static async CrearCarritoSiNoExiste(id_usuario) {
        try {
            const [carrito] = await pool.query(
                `SELECT * FROM carrito WHERE id_usuario = ?`,
                [id_usuario]
            );

            if (carrito.length === 0) {
                const [result] = await pool.query(
                    `INSERT INTO carrito (id_usuario) VALUES (?)`,
                    [id_usuario]
                );
                return result.insertId;
            };
            return carrito[0].id_carrito;
        } catch (error) {
            console.error('Error al crear el carrito: ', error);
            throw error;
        }
    }

    static async AgregarBoletaCarrito({ id_carrito, id_boleta, cantidad }) {
        try {
            const [existe] = await pool.query(
                'SELECT * FROM carrito_boleta WHERE id_carrito = ? AND id_boleta = ?',
                [id_carrito, id_boleta]
            );

            if (existe.length > 0) {
                await pool.query(
                    'UPDATE carrito_boleta SET cantidad = cantidad + ? WHERE id_carrito = ? AND id_boleta = ?',
                    [cantidad, id_carrito, id_boleta]
                );
            } else {
                await pool.query(
                    'INSERT INTO carrito_boleta (id_carrito, id_boleta, cantidad) VALUES (?, ?, ?)',
                    [id_carrito, id_boleta, cantidad]
                );
            }
        } catch (error) {
            console.error('Error al agregar boleta al carrito: ', error);
            throw error;
        }
    }

    static async ObtenerItemsCarrito(id_carrito) {
        try {
            const [items] = await pool.query(`
            SELECT cb.*, b.precio_boleta, b.tipo_boleta, b.localidad_boleta, e.nombre_evento
            FROM carrito_boleta cb
            JOIN boletas b ON cb.id_boleta = b.id_boleta
            JOIN evento e ON b.id_evento = e.id_evento
            WHERE cb.id_carrito = ?
        `, [id_carrito]);

            return items;

        } catch (error) {
            console.error('Error al obtener los items del carrito: ', error);
            throw error;
        }
    }

    static async ElminarItemCarrito(id_carrito, id_boleta) {
        await pool.query(
            'DELETE FROM carrito_boleta WHERE id_carrito = ? AND id_boleta = ?',
            [id_carrito, id_boleta]
        );
    }

    static async VaciarCarrito(id_carrito) {
        await pool.query(
            'DELETE FROM carrito_boleta WHERE id_carrito = ?',
            [id_carrito]
        );
    }

    static async ObtenerCarritoUsuario(idUsuario) {
        try {
            const [rows] = await pool.query(`
                SELECT 
                c.id_boleta,
                c.cantidad,
                b.precio_boleta,
                b.tipo_boleta,
                b.localidad_boleta,
                e.nombre_evento
            FROM carrito c
            INNER JOIN boleta b ON c.id_boleta = b.id_boleta
            INNER JOIN evento e ON b.id_evento = e.id_evento
            WHERE c.id_usuario = ?`, [idUsuario]);

            return rows;
        } catch (error) {
            console.error('Error obteniendo carrito:', error);
            return [];
        }
    }
}

module.exports = Carrito;