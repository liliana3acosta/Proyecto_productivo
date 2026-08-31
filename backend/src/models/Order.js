import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({

    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    nombre: {
        type: String,
        required: true
    },

    cantidad: {
        type: Number,
        required: true,
        min: 1
    },

    talla: {
        type: String,
        default: ""
    },

    color: {
        type: String,
        default: ""
    },

    precio: {
        type: Number,
        required: true
    }

});

const orderSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        productos: [orderItemSchema],

        total: {
            type: Number,
            required: true,
            default: 0
        },

        direccionEnvio: {
            type: String,
            required: true
        },

        telefonoContacto: {
            type: String,
            default: ""
        },

        estado: {
            type: String,
            enum: ["pendiente", "pagado", "enviado", "entregado", "cancelado"],
            default: "pendiente"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Order", orderSchema);
