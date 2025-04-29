const db = require('../config/database');

class Rol {
    static async obtenerRoles(){
        try {
            const [roles] = await db.query('SELECT * FROM rol');
            return roles;
        } catch (error) {
            console.error('Error al obtener la informacion de los roles', error);
            throw error;
        }
    }
}