const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear Conexion a la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function initDb() {
    try {
        const connection = await pool.getConnection();

         //Crear tabla artistas
        await connection.query(`
            CREATE TABLE IF NOT EXISTS artista (
                id_artista BIGINT AUTO_INCREMENT PRIMARY KEY,
                nombre_artista VARCHAR(200) NOT NULL,
                genero_musical VARCHAR(200) NOT NULL
            )ENGINE=InnoDB;
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS organizador (
                id_organizador BIGINT AUTO_INCREMENT PRIMARY KEY,
                nombre_organizador VARCHAR(200) NOT NULL,
                tipo_documento VARCHAR(200) NOT NULL,
                numero_documento BIGINT NOT NULL,
                direccion VARCHAR(250) NOT NULL
            )ENGINE=InnoDB;
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS rol (
                id_rol BIGINT AUTO_INCREMENT PRIMARY KEY,
                nombre_rol VARCHAR(200) NOT NULL
            )ENGINE=InnoDB;
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS evento (
                id_evento BIGINT AUTO_INCREMENT PRIMARY KEY,
                nombre_evento VARCHAR(250) NOT NULL,
                categoria_evento VARCHAR(250) NOT NULL,
                lugar_evento VARCHAR(250) NOT NULL,
                ciudad_evento VARCHAR(200) NOT NULL,
                departamento_evento VARCHAR(200) NOT NULL,
                aforo_evento BIGINT NOT NULL,
                fecha_inicio_evento DATE NOT NULL,
                fecha_fin_evento DATE,
                hora_inicio_evento TIME(0) NOT NULL,
                hora_apertura TIME(0) NOT NULL,
                genero_evento VARCHAR(200) NOT NULL,
                edad_minima INT,
                url_image_evento VARCHAR(255),
                id_artista BIGINT NOT NULL,
                id_organizador BIGINT NOT NULL,
                FOREIGN KEY (id_artista) REFERENCES artista(id_artista) ON DELETE RESTRICT,
                FOREIGN KEY (id_organizador) REFERENCES organizador(id_organizador) ON DELETE RESTRICT
            )ENGINE=InnoDB;
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS boletas (
                id_boleta BIGINT AUTO_INCREMENT PRIMARY KEY,
                precio_boleta FLOAT NOT NULL,
                tipo_boleta VARCHAR(200) NOT NULL,
                localidad_boleta VARCHAR(200) NOT NULL,
                num_personas INT NOT NULL,
                id_evento BIGINT NOT NULL,
                FOREIGN KEY (id_evento) REFERENCES evento(id_evento) ON DELETE RESTRICT
            )ENGINE=InnoDB;
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
                primer_nombre VARCHAR(200) NOT NULL,
                segundo_nombre VARCHAR(200),
                primer_apellido VARCHAR(200) NOT NULL,
                segundo_apellido VARCHAR(200),
                tipo_documento_usuario VARCHAR(100) NOT NULL,
                numero_documento_usuario BIGINT NOT NULL,
                fecha_nacimiento DATE NOT NULL,
                celular_usuario BIGINT NOT NULL,
                direccion_usuario VARCHAR(200) NOT NULL,
                edad_usuario INT NOT NULL,
                correo_electronico VARCHAR(250) NOT NULL,
                contrasena VARCHAR(100) NOT NULL,
                id_rol BIGINT NOT NULL,
                FOREIGN KEY (id_rol) REFERENCES rol(id_rol) ON DELETE RESTRICT
            )ENGINE=InnoDB;
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS compra (
                id_compra BIGINT AUTO_INCREMENT PRIMARY KEY,
                cantidad_boletas INT NOT NULL,
                valor_entrada FLOAT NOT NULL,
                valor_servicio FLOAT NOT NULL,
                valor_pago FLOAT NOT NULL,
                id_usuario BIGINT NOT NULL,
                id_boleta BIGINT NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE RESTRICT,
                FOREIGN KEY (id_boleta) REFERENCES boletas(id_boleta) ON DELETE RESTRICT
            )ENGINE=InnoDB;
         `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS venta (
                id_venta BIGINT AUTO_INCREMENT PRIMARY KEY,
                valor_venta FLOAT NOT NULL,
                fecha_venta DATE NOT NULL,
                metodo_pago VARCHAR(200),
                id_compra BIGINT NOT NULL,
                FOREIGN KEY (id_compra) REFERENCES compra(id_compra) ON DELETE RESTRICT
            )ENGINE=InnoDB;
        `);

        connection.release();
        console.log("Base de Datos inicializada correctamente");
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    }
}

initDb();

module.exports = pool;