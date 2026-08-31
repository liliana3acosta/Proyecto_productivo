import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

// NOTA: esto simula un pago (no está conectado a una pasarela real como
// Stripe o Mercado Pago). Para producción, aquí es donde llamarías a la
// API del proveedor de pagos y usarías su respuesta para decidir el estado.
export const procesarPago = async (usuarioId, data) => {

    const orden = await Order.findById(data.orden);

    if (!orden) {

        throw new Error("Orden no encontrada.");

    }

    if (orden.usuario.toString() !== usuarioId) {

        throw new Error("No tienes permiso sobre esta orden.");

    }

    if (orden.estado === "pagado") {

        throw new Error("Esta orden ya fue pagada.");

    }

    const pago = await Payment.create({
        orden: orden._id,
        usuario: usuarioId,
        monto: orden.total,
        metodo: data.metodo,
        estado: "completado",
        referencia: `SIM-${Date.now()}`
    });

    orden.estado = "pagado";
    await orden.save();

    return pago;

};

export const obtenerPago = async (id) => {

    return await Payment.findById(id)
        .populate("orden")
        .populate("usuario", "nombre apellido email");

};

export const obtenerPagosUsuario = async (usuarioId) => {

    return await Payment.find({ usuario: usuarioId }).sort({ createdAt: -1 });

};

export const obtenerPagoPorOrden = async (ordenId) => {

    return await Payment.findOne({ orden: ordenId });

};
