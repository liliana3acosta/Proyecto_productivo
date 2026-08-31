import * as appointmentService from "../services/appointment.service.js";

export const crearCita = async (req, res) => {

    try {

        const cita = await appointmentService.crearCita(req.user.id, req.body);

        res.status(201).json({
            success: true,
            cita
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerMisCitas = async (req, res) => {

    try {

        const citas = await appointmentService.obtenerCitasUsuario(req.user.id);

        res.json(citas);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerTodasLasCitas = async (req, res) => {

    try {

        const citas = await appointmentService.obtenerTodasLasCitas();

        res.json(citas);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerCita = async (req, res) => {

    try {

        const cita = await appointmentService.obtenerCita(req.params.id);

        if (!cita) {

            return res.status(404).json({
                success: false,
                message: "Cita no encontrada."
            });

        }

        res.json(cita);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const actualizarEstadoCita = async (req, res) => {

    try {

        const cita = await appointmentService.actualizarEstadoCita(
            req.params.id,
            req.body.estado
        );

        res.json({
            success: true,
            cita
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const cancelarCita = async (req, res) => {

    try {

        const cita = await appointmentService.cancelarCita(
            req.params.id,
            req.user.id,
            req.user.rol === "admin"
        );

        res.json({
            success: true,
            cita
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};
