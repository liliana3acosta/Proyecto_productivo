import express from "express";

import verifyToken from "../middleware/auth.middleware.js";

import * as cartController from "../controllers/cart.controller.js";

const router = express.Router();

router.get(
    "/",
    verifyToken,
    cartController.obtenerCarrito
);

router.post(
    "/",
    verifyToken,
    cartController.agregarProducto
);

router.put(
    "/:itemId",
    verifyToken,
    cartController.actualizarCantidad
);

router.delete(
    "/:itemId",
    verifyToken,
    cartController.eliminarProducto
);

router.delete(
    "/",
    verifyToken,
    cartController.vaciarCarrito
);

export default router;