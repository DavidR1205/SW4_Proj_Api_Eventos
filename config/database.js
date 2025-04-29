const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

sequelize.authenticate()
        .then(() => console.log('Conexion Exitosa'))
        .catch(err => console.error('Error al conectarse a la BD', err));

module.exports = sequelize;