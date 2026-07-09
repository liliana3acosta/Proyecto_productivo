import * as cartService from "../services/cart.service.js";

export const obtenerCarrito = async(req,res)=>{

    try{

        const carrito = await cartService.obtenerCarrito(req.user.id);

        res.json(carrito);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

export const agregarProducto = async(req,res)=>{

    try{

        const carrito = await cartService.agregarProducto(

            req.user.id,

            req.body

        );

        res.status(201).json(carrito);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

export const actualizarCantidad = async(req,res)=>{

    try{

        const carrito = await cartService.actualizarCantidad(

            req.user.id,

            req.params.itemId,

            req.body.cantidad

        );

        res.json(carrito);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

export const eliminarProducto = async(req,res)=>{

    try{

        const carrito = await cartService.eliminarProducto(

            req.user.id,

            req.params.itemId

        );

        res.json(carrito);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

export const vaciarCarrito = async(req,res)=>{

    try{

        const carrito = await cartService.vaciarCarrito(

            req.user.id

        );

        res.json(carrito);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};