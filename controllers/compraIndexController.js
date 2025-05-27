const { validationResult } = require('express-validator');
const boletaModel = require('../models/boletaModel');
const compraModel = require('../models/compraModel');
const eventoModel = require('../models/eventoModel');

exports.listar = async (req, res) => {
    try {
        const idEvento = req.params.id;
        const evento = await eventoModel.obtenerEventosId(idEvento);
        if (!evento) {
            return res.status(404)
        }
        const boletas = await boletaModel.obtenerBoletaEvento(idEvento);
        res.render('pages/home/compra', {
            title: 'Comprar boletas',
            evento,
            boletas
        });
    } catch (error) {
        console.error(error);
        res.status(500)
    }
};

exports.agregarCarrito = async (req, res) => {
    try {
        const { id_boleta, cantidad } = req.body;
        const boleta = await boletaModel.obtenerBoletaId(id_boleta);

        if (!boleta) return res.status(404).send('Boleta no encontrada');

        const cantidadNum = parseInt(cantidad);
        const subtotal = boleta.precio_boleta * cantidadNum;
        const servicio = subtotal * 0.05;
        const total = subtotal + servicio;

        const item = {
            id_boleta: boleta.id_boleta,
            tipo: boleta.tipo_boleta,
            localidad: boleta.localidad_boleta,
            precio_unitario: boleta.precio_boleta,
            cantidad: cantidadNum,
            subtotal,
            servicio,
            total
        };

        if (!req.session.carrito) {
            req.session.carrito = [];
        }

        req.session.carrito.push(item);

        res.redirect('/carrito');
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).send('Error interno');
    }
}

exports.listarCarrito = async (req, res) => {
    try {
        const carrito = req.session.carrito;
        res.render('pages/home/carrito', {
            carrito
        });
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
    }
}