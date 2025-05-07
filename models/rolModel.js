const pool = require('../config/database');

class Rol {
    static async obtenerRoles() {
        try {
            const [roles] = await pool.query('SELECT * FROM rol');
            return roles;
        } catch (error) {
            console.error('Error al obtener la información de los roles', error);
            throw error;
        }
    }

    static async crearRol(rol) {
        try {
            const { nombre_rol } = rol;
            const [result] = await pool.query('INSERT INTO rol (nombre_rol) VALUES (?)', [nombre_rol]);
            return result.insertId;
        } catch (error) {
            console.error('Error al crear el rol', error);
            throw error;
        }
    }

    static async obtenerRolId(id) {
        try {
            const [rol] = await pool.query('SELECT * FROM rol WHERE id_rol = ?', [id]);
            return rol[0];
        } catch (error) {
            console.error('Error al obtener el rol por ID', error);
            throw error;
        }
    }

    static async actualizarRol(id, rol) {
        try {
            const { nombre_rol } = rol;
            const [result] = await pool.query('UPDATE rol SET nombre_rol = ? WHERE id_rol = ?', [nombre_rol, id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el rol', error);
            throw error;
        }
    }

    static async eliminarRol(id) {
        try {
            const [result] = await pool.query('DELETE FROM rol WHERE id_rol = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el rol', error);
            throw error;
        }
    }
}

module.exports = Rol;