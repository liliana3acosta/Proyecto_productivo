import User from "../models/User.js";
import bcrypt from "bcryptjs";
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

export const forgotPassword = async (req, res) => {

    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No existe un usuario con este correo."
            });
        }

        res.status(200).json({
            success: true,
            message: "Correo verificado. Puedes proceder a cambiar tu contraseña.",
            email
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

export const resetPassword = async (req, res) => {

    try {
        const { email, nuevaPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado."
            });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(nuevaPassword, salt);
        await user.save();

        res.status(200).json({
            success: true,
            message: "¡Contraseña actualizada con éxito!"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}