import Category from "../models/Category.js";

export const crearCategoria = async(data)=>{

    return await Category.create(data);

}

export const obtenerCategorias = async()=>{

    return await Category.find();

}

export const obtenerCategoria = async(id)=>{

    return await Category.findById(id);

}

export const actualizarCategoria = async(id,data)=>{

    return await Category.findByIdAndUpdate(
        id,
        data,
        {new:true}
    );

}

export const eliminarCategoria = async(id)=>{

    return await Category.findByIdAndDelete(id);

}