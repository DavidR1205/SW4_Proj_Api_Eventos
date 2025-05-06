const pool = require('../config/database');

class Usuario {
    static async obtenerUsuarios() {
        try {
            const [usuarios] = await pool.query('SELECT * FROM usuarios'); // Cambiado a "usuarios"
            return usuarios;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }
    }

    static async crearUsuario(usuario) {
        try {
            const {
                primer_nombre,
                segundo_nombre,
                primer_apellido,
                segundo_apellido,
                tipo_documento_usuario,
                numero_documento_usuario,
                fecha_nacimiento,
                celular_usuario,
                direccion_usuario,
                edad_usuario,
                correo_electronico,
                contrasena,
                id_rol
            } = usuario;

            const [result] = await pool.query(
                `INSERT INTO usuarios (
                    primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
                    tipo_documento_usuario, numero_documento_usuario, fecha_nacimiento,
                    celular_usuario, direccion_usuario, edad_usuario, correo_electronico,
                    contrasena, id_rol
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
                    tipo_documento_usuario, numero_documento_usuario, fecha_nacimiento,
                    celular_usuario, direccion_usuario, edad_usuario, correo_electronico,
                    contrasena, id_rol
                ]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw error;
        }
    }

    static async obtenerUsuarioPorId(id) {
        try {
            const [usuario] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]); // Cambiado a "usuarios"
            return usuario[0];
        } catch (error) {
            console.error('Error al obtener el usuario por ID:', error);
            throw error;
        }
    }

    static async actualizarUsuario(id, usuario) {
        try {
            const {
                primer_nombre,
                segundo_nombre,
                primer_apellido,
                segundo_apellido,
                tipo_documento_usuario,
                numero_documento_usuario,
                fecha_nacimiento,
                celular_usuario,
                direccion_usuario,
                edad_usuario,
                correo_electronico,
                contrasena,
                id_rol
            } = usuario;

            const [result] = await pool.query(
                `UPDATE usuarios SET
                    primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?,
                    tipo_documento_usuario = ?, numero_documento_usuario = ?, fecha_nacimiento = ?,
                    celular_usuario = ?, direccion_usuario = ?, edad_usuario = ?, correo_electronico = ?,
                    contrasena = ?, id_rol = ?
                WHERE id_usuario = ?`,
                [
                    primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
                    tipo_documento_usuario, numero_documento_usuario, fecha_nacimiento,
                    celular_usuario, direccion_usuario, edad_usuario, correo_electronico,
                    contrasena, id_rol, id
                ]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    }

    static async eliminarUsuario(id) {
        try {
            const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]); // Cambiado a "usuarios"
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            throw error;
        }
    }
}

module.exports = Usuario;