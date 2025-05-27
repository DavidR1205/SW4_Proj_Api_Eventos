const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
    static async obtenerUsuarios() {
        try {
            const [usuarios] = await pool.query('SELECT * FROM usuarios');
            return usuarios;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }
    }

    static async crearUsuario(usuario) {
        try {
            // Encriptar la contraseña antes de guardar
            if (usuario.contrasena) {
                usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
            }
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
            const [usuario] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
            return usuario[0];
        } catch (error) {
            console.error('Error al obtener el usuario por ID:', error);
            throw error;
        }
    }

    static async actualizarUsuario(id, usuario) {
        try {
            // Encriptar la contraseña solo si viene en la actualización
            if (usuario.contrasena) {
                usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
            }
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
            const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            throw error;
        }
    }

    static async obtenerUsuarioPorCorreo(correo_electronico) {
        try {
            const [usuario] = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [correo_electronico]);
            return usuario[0];
        } catch (error) {
            console.error('Error al obtener el usuario por correo:', error);
            throw error;
        }
    }
}

module.exports = Usuario;