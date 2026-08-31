import express from "express";
import { body } from "express-validator";

import * as appointmentController from "../controllers/appointment.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import checkRole from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

const router = express.Router();

const validarCita = [
    body("servicio").trim().notEmpty().withMessage("El servicio es obligatorio."),
    body("fecha").isISO8601().withMessage("La fecha no es válida."),
    body("hora").trim().notEmpty().withMessage("La hora es obligatoria.")
];

router.post("/", verifyToken, validarCita, validate, appointmentController.crearCita);

router.get("/mis-citas", verifyToken, appointmentController.obtenerMisCitas);

router.get("/", verifyToken, checkRole("admin"), appointmentController.obtenerTodasLasCitas);

router.get("/:id", verifyToken, appointmentController.obtenerCita);

router.put("/:id/estado", verifyToken, checkRole("admin"), appointmentController.actualizarEstadoCita);

router.put("/:id/cancelar", verifyToken, appointmentController.cancelarCita);

export default router;
