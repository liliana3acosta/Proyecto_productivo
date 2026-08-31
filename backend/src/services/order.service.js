import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import calculateTotal from "../utils/calculateTotal.js";
import { getPaginationParams, buildPaginatedResponse } from "../utils/pagination.js";

export const crearOrdenDesdeCarrito = async (usuarioId, datosEnvio) => {

    const carrito = await Cart.findOne({ usuario: usuarioId }).populate("productos.producto");

    if (!carrito || carrito.productos.length === 0) {

        throw new Error("El carrito está vacío.");

    }

    const productosOrden = carrito.productos.map(item => ({
        producto: item.producto._id,
        nombre: item.producto.nombre,
        cantidad: item.cantidad,
        talla: item.talla,
        color: item.color,
        precio: item.precio
    }));

    // Validar stock disponible antes de descontar
    for (const item of carrito.productos) {

        if (item.producto.stock < item.cantidad) {

            throw new Error(`Stock insuficiente para "${item.producto.nombre}".`);

        }

    }

    const orden = await Order.create({
        usuario: usuarioId,
        productos: productosOrden,
        total: calculateTotal(productosOrden),
        direccionEnvio: datosEnvio.direccionEnvio,
        telefonoContacto: datosEnvio.telefonoContacto || ""
    });

    // Descontar stock
    for (const item of carrito.productos) {

        await Product.findByIdAndUpdate(item.producto._id, {
            $inc: { stock: -item.cantidad }
        });

    }

    // Vaciar el carrito
    carrito.productos = [];
    carrito.total = 0;
    await carrito.save();

    return orden;

};

export const obtenerOrdenesUsuario = async (usuarioId, query = {}) => {

    const { page, limit, skip } = getPaginationParams(query);

    const [ordenes, total] = await Promise.all([
        Order.find({ usuario: usuarioId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Order.countDocuments({ usuario: usuarioId })
    ]);

    return buildPaginatedResponse(ordenes, total, page, limit);

};

export const obtenerTodasLasOrdenes = async (query = {}) => {

    const { page, limit, skip } = getPaginationParams(query);

    const [ordenes, total] = await Promise.all([
        Order.find()
            .populate("usuario", "nombre apellido email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Order.countDocuments()
    ]);

    return buildPaginatedResponse(ordenes, total, page, limit);

};

export const obtenerOrden = async (id) => {

    return await Order.findById(id).populate("usuario", "nombre apellido email");

};

export const actualizarEstadoOrden = async (id, estado) => {

    return await Order.findByIdAndUpdate(
        id,
        { estado },
        { new: true }
    );

};
