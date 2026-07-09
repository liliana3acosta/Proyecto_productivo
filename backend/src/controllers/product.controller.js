import * as productService from "../services/product.service.js";

export const crearProducto = async (req, res) => {

    try {

        const producto = await productService.crearProducto(req.body);

        res.status(201).json({
            success: true,
            producto
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerProductos = async (req, res) => {

    try {

        const productos = await productService.obtenerProductos();

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerProducto = async (req, res) => {

    try {

        const producto = await productService.obtenerProducto(req.params.id);

        if (!producto) {

            return res.status(404).json({
                message: "Producto no encontrado"
            });

        }

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const actualizarProducto = async (req, res) => {

    try {

        const producto = await productService.actualizarProducto(
            req.params.id,
            req.body
        );

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const eliminarProducto = async (req, res) => {

    try {

        await productService.eliminarProducto(req.params.id);

        res.json({
            success: true,
            message: "Producto eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const buscarProductos = async (req, res) => {

    try {

        const productos = await productService.buscarProductos(
            req.query.nombre
        );

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const filtrarCategoria = async (req, res) => {

    try {

        const productos = await productService.filtrarCategoria(
            req.params.id
        );

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const filtrarPrecio = async (req, res) => {

    try {

        const productos = await productService.filtrarPrecio(

            Number(req.query.min),

            Number(req.query.max)

        );

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};