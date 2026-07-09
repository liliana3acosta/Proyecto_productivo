import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({

    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    cantidad: {
        type: Number,
        required: true,
        default: 1,
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

const cartSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    productos: [cartItemSchema],

    total: {
        type: Number,
        default: 0
    }

},
{
    timestamps:true
});

export default mongoose.model("Cart",cartSchema);