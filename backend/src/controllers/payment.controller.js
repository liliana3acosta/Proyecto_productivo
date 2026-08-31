import * as paymentService from "../services/payment.service.js";

export const procesarPago = async (req, res) => {

    try {

        const pago = await paymentService.procesarPago(req.user.id, req.body);

        res.status(201).json({
            success: true,
            pago
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerPago = async (req, res) => {

    try {

        const pago = await paymentService.obtenerPago(req.params.id);

        if (!pago) {

            return res.status(404).json({
                success: false,
                message: "Pago no encontrado."
            });

        }

        const esDueno = pago.usuario._id.toString() === req.user.id;

        if (!esDueno && req.user.rol !== "admin") {

            return res.status(403).json({
                success: false,
                message: "No tienes permiso para ver este pago."
            });

        }

        res.json(pago);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerMisPagos = async (req, res) => {

    try {

        const pagos = await paymentService.obtenerPagosUsuario(req.user.id);

        res.json(pagos);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
