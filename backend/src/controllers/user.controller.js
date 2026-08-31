import * as userService from "../services/user.service.js";

export const obtenerUsuarios = async (req, res) => {

    try {

        const resultado = await userService.obtenerUsuarios(req.query);

        res.json(resultado);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const obtenerUsuario = async (req, res) => {

    try {

        const usuario = await userService.obtenerUsuario(req.params.id);

        if (!usuario) {

            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado."
            });

        }

        res.json(usuario);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const actualizarPerfil = async (req, res) => {

    try {

        // Un usuario solo puede editar su propio perfil, salvo que sea admin
        const idObjetivo = req.user.rol === "admin" ? req.params.id : req.user.id;

        const usuario = await userService.actualizarPerfil(idObjetivo, req.body);

        res.json({
            success: true,
            usuario
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const actualizarRol = async (req, res) => {

    try {

        const usuario = await userService.actualizarRol(req.params.id, req.body.rol);

        res.json({
            success: true,
            usuario
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const eliminarUsuario = async (req, res) => {

    try {

        await userService.eliminarUsuario(req.params.id);

        res.json({
            success: true,
            message: "Usuario eliminado correctamente."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
