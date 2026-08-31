import * as orderService from "../services/order.service.js";
import { enviarConfirmacionOrden } from "../services/email.service.js";
import User from "../models/User.js";

export const crearOrden = async (req, res) => {

    try {

        const orden = await orderService.crearOrdenDesdeCarrito(req.user.id, req.body);

        const usuario = await User.findById(req.user.id);

        if (usuario) {

            await enviarConfirmacionOrden(usuario, orden);

        }

        res.status(201).json({
            success: true,
            orden
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerMisOrdenes = async (req, res) => {

    try {

        const resultado = await orderService.obtenerOrdenesUsuario(req.user.id, req.query);

        res.json(resultado);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerTodasLasOrdenes = async (req, res) => {

    try {

        const resultado = await orderService.obtenerTodasLasOrdenes(req.query);

        res.json(resultado);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerOrden = async (req, res) => {

    try {

        const orden = await orderService.obtenerOrden(req.params.id);

        if (!orden) {

            return res.status(404).json({
                success: false,
                message: "Orden no encontrada."
            });

        }

        const esDuena = orden.usuario._id.toString() === req.user.id;

        if (!esDuena && req.user.rol !== "admin") {

            return res.status(403).json({
                success: false,
                message: "No tienes permiso para ver esta orden."
            });

        }

        res.json(orden);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const actualizarEstadoOrden = async (req, res) => {

    try {

        const orden = await orderService.actualizarEstadoOrden(
            req.params.id,
            req.body.estado
        );

        res.json({
            success: true,
            orden
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};
