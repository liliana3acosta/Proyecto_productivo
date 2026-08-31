import * as reviewService from "../services/review.service.js";

export const crearReview = async (req, res) => {

    try {

        const review = await reviewService.crearReview(req.user.id, req.body);

        res.status(201).json({
            success: true,
            review
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerReviewsProducto = async (req, res) => {

    try {

        const [reviews, resumen] = await Promise.all([
            reviewService.obtenerReviewsProducto(req.params.productoId),
            reviewService.obtenerPromedioProducto(req.params.productoId)
        ]);

        res.json({ reviews, resumen });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const eliminarReview = async (req, res) => {

    try {

        await reviewService.eliminarReview(
            req.params.id,
            req.user.id,
            req.user.rol === "admin"
        );

        res.json({
            success: true,
            message: "Reseña eliminada correctamente."
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};
