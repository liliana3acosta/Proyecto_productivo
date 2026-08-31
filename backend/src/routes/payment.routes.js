import express from "express";
import { body } from "express-validator";

import * as paymentController from "../controllers/payment.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

const router = express.Router();

const validarPago = [
    body("orden").notEmpty().withMessage("La orden es obligatoria."),
    body("metodo").isIn(["tarjeta", "efectivo", "transferencia"]).withMessage("Método de pago inválido.")
];

router.post("/", verifyToken, validarPago, validate, paymentController.procesarPago);

router.get("/mis-pagos", verifyToken, paymentController.obtenerMisPagos);

router.get("/:id", verifyToken, paymentController.obtenerPago);

export default router;
