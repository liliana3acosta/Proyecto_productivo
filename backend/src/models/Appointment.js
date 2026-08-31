import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        servicio: {
            type: String,
            required: true,
            trim: true
        },

        fecha: {
            type: Date,
            required: true
        },

        hora: {
            type: String,
            required: true
        },

        notas: {
            type: String,
            default: ""
        },

        estado: {
            type: String,
            enum: ["pendiente", "confirmada", "cancelada", "completada"],
            default: "pendiente"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Appointment", appointmentSchema);
