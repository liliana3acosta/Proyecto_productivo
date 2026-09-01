import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerService = async(data)=>{

    const existe = await User.findOne({
        email:data.email
    });

    if(existe){
        throw new Error("El correo ya está registrado.");
    }

    const passwordHash = await bcrypt.hash(data.password,10);

    const usuario = await User.create({

        nombre:data.nombre,
        apellido:data.apellido,
        email:data.email,
        password:passwordHash,
        telefono:data.telefono,
        direccion:data.direccion

    });

    const usuarioSinPassword = usuario.toObject();
    delete usuarioSinPassword.password;

    return usuarioSinPassword;

}

export const loginService = async(email,password)=>{

    const usuario = await User.findOne({email});

    if(!usuario){
        throw new Error("Credenciales inválidas.");
    }

    const coincide = await bcrypt.compare(password,usuario.password);

    if(!coincide){
        throw new Error("Credenciales inválidas.");
    }

    const token = generateToken(usuario._id,usuario.rol);

    const usuarioSinPassword = usuario.toObject();
    delete usuarioSinPassword.password;

    return{
        token,
        usuario:usuarioSinPassword
    }

}