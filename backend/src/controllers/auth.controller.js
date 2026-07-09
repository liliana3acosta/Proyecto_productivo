import User from "../models/User.js";
import {
    registerService,
    loginService
} from "../services/auth.service.js";

export const register = async(req,res)=>{

    try{

        const usuario = await registerService(req.body);

        res.status(201).json({
            success:true,
            message:"Usuario registrado correctamente.",
            usuario
        });

    }
    catch(error){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

}

export const login = async(req,res)=>{

    try{

        const {email,password}=req.body;

        const respuesta = await loginService(email,password);

        res.json({
            success:true,
            token:respuesta.token,
            usuario:respuesta.usuario
        });

    }
    catch(error){

        res.status(401).json({
            success:false,
            message:error.message
        });

    }

}

export const profile = async(req,res)=>{

    try{

        const usuario = await User.findById(req.user.id)
        .select("-password");

        res.json(usuario);

    }
    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}