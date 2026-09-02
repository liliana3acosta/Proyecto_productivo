import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const obtenerCarrito = async (usuarioId) => {
    let carrito = await Cart.findOne({
        usuario: usuarioId
    }).populate("productos.producto");

    if (!carrito) {
        carrito = await Cart.create({
            usuario: usuarioId,
            productos: [],
            total: 0
        });
        await carrito.populate("productos.producto");
    }

    return carrito;
};

export const agregarProducto = async (usuarioId, data) => {
    let carrito = await Cart.findOne({
        usuario: usuarioId
    });

    if (!carrito) {
        carrito = await Cart.create({
            usuario: usuarioId,
            productos: [],
            total: 0
        });
    }

    const producto = await Product.findById(data.producto);

    if (!producto) {
        throw new Error("Producto no encontrado");
    }

    const existente = carrito.productos.find(item =>
        item.producto.toString() === data.producto &&
        item.talla === data.talla &&
        item.color === data.color
    );

    if (existente) {
        existente.cantidad += data.cantidad;
    } else {
        carrito.productos.push({
            producto: data.producto,
            cantidad: data.cantidad,
            talla: data.talla,
            color: data.color,
            precio: producto.precio
        });
    }

    carrito.total = carrito.productos.reduce(
        (total, item) => total + item.cantidad * item.precio,
        0
    );

    await carrito.save();
    
    // Devolvemos el carrito completamente populado con las imágenes
    return await Cart.findById(carrito._id).populate("productos.producto");
};

export const actualizarCantidad = async (usuarioId, itemId, cantidad) => {
    const carrito = await Cart.findOne({
        usuario: usuarioId
    });

    if (!carrito) {
        throw new Error("Carrito no encontrado");
    }

    const item = carrito.productos.id(itemId);

    if (!item) {
        throw new Error("Producto no encontrado en el carrito");
    }

    item.cantidad = cantidad;

    carrito.total = carrito.productos.reduce(
        (total, item) => total + item.cantidad * item.precio,
        0
    );

    await carrito.save();

    return await Cart.findById(carrito._id).populate("productos.producto");
};

export const eliminarProducto = async (usuarioId, itemId) => {
    const carrito = await Cart.findOne({
        usuario: usuarioId
    });

    if (!carrito) {
        throw new Error("Carrito no encontrado");
    }

    carrito.productos.pull(itemId);

    carrito.total = carrito.productos.reduce(
        (total, item) => total + item.cantidad * item.precio,
        0
    );

    await carrito.save();

    return await Cart.findById(carrito._id).populate("productos.producto");
};

export const vaciarCarrito = async (usuarioId) => {
    const carrito = await Cart.findOne({
        usuario: usuarioId
    });

    if (!carrito) {
        throw new Error("Carrito no encontrado");
    }

    carrito.productos = [];
    carrito.total = 0;

    await carrito.save();

    return await Cart.findById(carrito._id).populate("productos.producto");
};