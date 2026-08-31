import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        calificacion: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comentario: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

reviewSchema.index({ producto: 1, usuario: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
