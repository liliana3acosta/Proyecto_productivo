import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        descripcion: {
            type: String,
            required: true
        },

        precio: {
            type: Number,
            required: true,
            min: 0
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        categoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        imagenes: [{
            type: String
        }],

        talla: [{
            type: String
        }],

        color: [{
            type: String
        }],

        estado: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Product", productSchema);