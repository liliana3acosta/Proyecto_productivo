import * as categoryService from "../services/category.service.js";

export const crearCategoria = async(req,res)=>{

    try{

        const categoria = await categoryService.crearCategoria(req.body);

        res.status(201).json({
            success:true,
            categoria
        });

    }
    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}

export const obtenerCategorias = async(req,res)=>{

    try{

        const categorias = await categoryService.obtenerCategorias();

        res.json(categorias);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

}

export const obtenerCategoria = async(req,res)=>{

    try{

        const categoria = await categoryService.obtenerCategoria(req.params.id);

        if(!categoria){

            return res.status(404).json({
                message:"Categoría no encontrada"
            });

        }

        res.json(categoria);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

}

export const actualizarCategoria = async(req,res)=>{

    try{

        const categoria = await categoryService.actualizarCategoria(
            req.params.id,
            req.body
        );

        res.json(categoria);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

}

export const eliminarCategoria = async(req,res)=>{

    try{

        await categoryService.eliminarCategoria(req.params.id);

        res.json({
            success:true,
            message:"Categoría eliminada correctamente."
        });

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

}