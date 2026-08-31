import express from "express";
import { body } from "express-validator";

import * as orderController from "../controllers/order.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import checkRole from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

const router = express.Router();

const validarOrden = [
    body("direccionEnvio").trim().notEmpty().withMessage("La dirección de envío es obligatoria.")
];

router.post("/", verifyToken, validarOrden, validate, orderController.crearOrden);

router.get("/mis-ordenes", verifyToken, orderController.obtenerMisOrdenes);

router.get("/", verifyToken, checkRole("admin"), orderController.obtenerTodasLasOrdenes);

router.get("/:id", verifyToken, orderController.obtenerOrden);

router.put("/:id/estado", verifyToken, checkRole("admin"), orderController.actualizarEstadoOrden);

export default router;
