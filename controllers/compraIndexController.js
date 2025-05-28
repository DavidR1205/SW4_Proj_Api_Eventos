const { validationResult } = require('express-validator');
const boletaModel = require('../models/boletaModel');
const compraModel = require('../models/compraModel');
const eventoModel = require('../models/eventoModel');
const carritoModel = require('../models/carritoModel');

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
            const id_usuario = req.user.id_usuario;
            const { id_boleta, cantidad } = req.body;

            const id_carrito = await carritoModel.CrearCarritoSiNoExiste(id_usuario);
            await carritoModel.AgregarBoletaCarrito({ id_carrito, id_boleta, cantidad: parseInt(cantidad) });

            res.redirect('/carrito');
        } catch (error) {
            console.error('Error al agregar la compra al carrito:', error);
            res.status(500).send('Error interno del servidor');
        }
    }

exports.verCarrito = async (req, res) => {
    try {
        const id_usuario = req.user.id_usuario;
        const id_carrito = await carritoModel.CrearCarritoSiNoExiste(id_usuario);
        const items = await carritoModel.ObtenerItemsCarrito(id_carrito);

        res.render('pages/home/carrito', {
            carrito: items
        });
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.eliminarItem = async (req, res) => {
    try {
        const id_usuario = req.user.id_usuario;
        const { id_boleta } = req.params;

        const id_carrito = await carritoModel.CrearCarritoSiNoExiste(id_usuario);
        await carritoModel.ElminarItemCarrito(id_carrito, id_boleta);

        res.redirect('/carrito')
    } catch (error) {
        console.error('Error al eliminar item del carrito:', error);
        res.status(500).send('Error interno');
    }
};