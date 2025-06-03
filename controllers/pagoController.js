const Mercadopago = require('mercadopago');
const carritoModel = require('../models/carritoModel');
const pool = require('../config/database');
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

const client = new Mercadopago.MercadoPagoConfig({
    accessToken: 'APP_USR-2588976822470009-052813-e33c634bdfb04194a41ecfbe024c1d40-2461834117'
});

const preference = new Mercadopago.Preference(client);
const payment = new Mercadopago.Payment(client);


exports.generarPreferencia = async (req, res) => {
    try {
        const { carrito } = req.body;

        const items = carrito.map(item => ({
            title: `${item.nombre_evento} - ${item.tipo_boleta} - ${item.localidad_boleta}`,
            quantity: Number(item.cantidad),
            unit_price: Number(item.precio_boleta),
            currency_id: 'COP',
        }));

        const result = await preference.create({
            body: {
                items,
                back_urls: {
                    success: `${baseUrl}/pago/exito`,
                    failure: `${baseUrl}/pago/fallo`,
                    pending: `${baseUrl}/pago/pendiente`
                },
                auto_return: 'approved'
            }
        });

        res.json({ preferenceId: result.id });
    } catch (error) {
        console.error('Error generando preferencia:', error);
        res.status(500).json({ error: 'Error generando preferencia' });
    }
};

exports.pagoExitoso = async (req, res) => {
    try {
        const id_usuario = req.user.id_usuario;
        const estado_pago = req.query.status;
        const metodo_pago = 'Mercado Pago';
        const fecha_actual = new Date();

        const [carritoRows] = await pool.query(`
            SELECT * FROM carrito WHERE id_usuario = ?
        `, [id_usuario]);

        const id_carrito = carritoRows[0].id_carrito;

        const [items] = await pool.query(`
            SELECT cb.id_boleta, cb.cantidad, b.precio_boleta
            FROM carrito_boleta cb
            INNER JOIN boletas b ON cb.id_boleta = b.id_boleta
            WHERE cb.id_carrito = ?
        `, [id_carrito]);

        for (const item of items) {
            const valor_pago = item.precio_boleta * item.cantidad;

            const [compraResult] = await pool.query(`
                INSERT INTO compra (cantidad_boletas, valor_pago, estado_pago, id_usuario)
                VALUES (?, ?, ?, ?)    
            `, [item.cantidad, valor_pago, estado_pago, id_usuario]);

            const id_compra = compraResult.insertId;

            if (estado_pago === 'approved') {
                await pool.query(`
                    INSERT INTO venta (valor_venta, fecha_venta, metodo_pago, id_compra)
                    VALUES (?, ?, ?, ?)    
                `, [valor_pago, fecha_actual, metodo_pago, id_compra]);

                const entradas = Array(item.cantidad).fill([id_usuario, item.id_boleta]);
                await pool.query(`
                    INSERT INTO entrada (id_usuario, id_boleta)
                    VALUES ?    
                `, [entradas]);
            }
        }

        await pool.query(`
            DELETE cb FROM carrito_boleta cb
            INNER JOIN carrito c ON cb.id_carrito = c.id_carrito
            WHERE c.id_carrito = ? AND c.id_usuario = ?
        `, [id_carrito, id_usuario]);

        await pool.query(`
            DELETE FROM carrito WHERE id_carrito = ? AND id_usuario = ?
        `, [id_carrito, id_usuario]);

        res.render('pages/home/pago_exito');
    } catch (error) {
        console.error('Error en pagoExitoso:', error);
        res.status(500).send('Error procesando el pago');
    }
}

exports.verificarPago = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;

        const result = await payment.get({ id: paymentId });

        const estado = result.status;

        res.json({ estado, detalles: result });
    } catch (error) {
        console.error('Error verificando el pago:', error);
        res.status(500).json({ error: 'Error verificando el pago' });
    }
};
