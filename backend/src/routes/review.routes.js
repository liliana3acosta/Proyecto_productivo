import express from "express";
import { body } from "express-validator";

import * as reviewController from "../controllers/review.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

const router = express.Router();

const validarReview = [
    body("producto").notEmpty().withMessage("El producto es obligatorio."),
    body("calificacion").isInt({ min: 1, max: 5 }).withMessage("La calificación debe ser de 1 a 5.")
];

router.post("/", verifyToken, validarReview, validate, reviewController.crearReview);

router.get("/producto/:productoId", reviewController.obtenerReviewsProducto);

router.delete("/:id", verifyToken, reviewController.eliminarReview);

export default router;
