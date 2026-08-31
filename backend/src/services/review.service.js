import mongoose from "mongoose";
import Review from "../models/Review.js";

export const crearReview = async (usuarioId, data) => {

    const existente = await Review.findOne({
        producto: data.producto,
        usuario: usuarioId
    });

    if (existente) {

        throw new Error("Ya dejaste una reseña para este producto.");

    }

    return await Review.create({
        producto: data.producto,
        usuario: usuarioId,
        calificacion: data.calificacion,
        comentario: data.comentario
    });

};

export const obtenerReviewsProducto = async (productoId) => {

    return await Review.find({ producto: productoId })
        .populate("usuario", "nombre apellido")
        .sort({ createdAt: -1 });

};

export const obtenerPromedioProducto = async (productoId) => {

    const resultado = await Review.aggregate([
        { $match: { producto: new mongoose.Types.ObjectId(productoId) } },
        {
            $group: {
                _id: "$producto",
                promedio: { $avg: "$calificacion" },
                total: { $sum: 1 }
            }
        }
    ]);

    if (resultado.length === 0) {

        return { promedio: 0, total: 0 };

    }

    return {
        promedio: Math.round(resultado[0].promedio * 10) / 10,
        total: resultado[0].total
    };

};

export const eliminarReview = async (id, usuarioId, esAdmin) => {

    const review = await Review.findById(id);

    if (!review) {

        throw new Error("Reseña no encontrada.");

    }

    if (!esAdmin && review.usuario.toString() !== usuarioId) {

        throw new Error("No tienes permiso para eliminar esta reseña.");

    }

    await review.deleteOne();

    return review;

};
