import Appointment from "../models/Appointment.js";

export const crearCita = async (usuarioId, data) => {

    return await Appointment.create({
        usuario: usuarioId,
        servicio: data.servicio,
        fecha: data.fecha,
        hora: data.hora,
        notas: data.notas
    });

};

export const obtenerCitasUsuario = async (usuarioId) => {

    return await Appointment.find({ usuario: usuarioId }).sort({ fecha: 1 });

};

export const obtenerTodasLasCitas = async () => {

    return await Appointment.find()
        .populate("usuario", "nombre apellido email")
        .sort({ fecha: 1 });

};

export const obtenerCita = async (id) => {

    return await Appointment.findById(id)
        .populate("usuario", "nombre apellido email");

};

export const actualizarEstadoCita = async (id, estado) => {

    return await Appointment.findByIdAndUpdate(
        id,
        { estado },
        { new: true }
    );

};

export const cancelarCita = async (id, usuarioId, esAdmin) => {

    const cita = await Appointment.findById(id);

    if (!cita) {

        throw new Error("Cita no encontrada.");

    }

    if (!esAdmin && cita.usuario.toString() !== usuarioId) {

        throw new Error("No tienes permiso para cancelar esta cita.");

    }

    cita.estado = "cancelada";

    await cita.save();

    return cita;

};
