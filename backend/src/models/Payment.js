import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        orden: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },

        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        monto: {
            type: Number,
            required: true,
            min: 0
        },

        metodo: {
            type: String,
            enum: ["tarjeta", "efectivo", "transferencia"],
            required: true
        },

        estado: {
            type: String,
            enum: ["pendiente", "completado", "fallido", "reembolsado"],
            default: "pendiente"
        },

        referencia: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Payment", paymentSchema);
