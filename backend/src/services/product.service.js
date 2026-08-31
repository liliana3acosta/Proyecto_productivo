import Product from "../models/Product.js";

export const crearProducto = async (data) => {

    return await Product.create(data);

};

export const obtenerProductos = async () => {

    return await Product.find()
        .populate("categoria");

};

export const obtenerProducto = async (id) => {

    return await Product.findById(id)
        .populate("categoria");

};

export const actualizarProducto = async (id, data) => {

    return await Product.findByIdAndUpdate(
        id,
        data,
        {
            new: true
        }
    );

};

export const eliminarProducto = async (id) => {

    return await Product.findByIdAndDelete(id);

};

export const buscarProductos = async (texto) => {

    return await Product.find({

        nombre: {

            $regex: texto,
            $options: "i"

        }

    });

};

export const filtrarCategoria = async (categoria) => {

    return await Product.find({
        categoria
    });

};

export const agregarImagen = async (id, urlImagen) => {

    return await Product.findByIdAndUpdate(
        id,
        { $push: { imagenes: urlImagen } },
        { new: true }
    );

};

export const filtrarPrecio = async (min, max) => {

    return await Product.find({

        precio: {

            $gte: min,
            $lte: max

        }

    });

};