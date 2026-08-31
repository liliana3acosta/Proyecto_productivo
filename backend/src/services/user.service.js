import User from "../models/User.js";
import hashPassword from "../utils/hashPassword.js";
import { getPaginationParams, buildPaginatedResponse } from "../utils/pagination.js";

export const obtenerUsuarios = async (query = {}) => {

    const { page, limit, skip } = getPaginationParams(query);

    const [usuarios, total] = await Promise.all([
        User.find()
            .select("-password")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        User.countDocuments()
    ]);

    return buildPaginatedResponse(usuarios, total, page, limit);

};

export const obtenerUsuario = async (id) => {

    return await User.findById(id).select("-password");

};

export const actualizarPerfil = async (id, data) => {

    const camposPermitidos = ["nombre", "apellido", "telefono", "direccion"];

    const actualizacion = {};

    for (const campo of camposPermitidos) {

        if (data[campo] !== undefined) {

            actualizacion[campo] = data[campo];

        }

    }

    if (data.password) {

        actualizacion.password = await hashPassword(data.password);

    }

    return await User.findByIdAndUpdate(
        id,
        actualizacion,
        { new: true }
    ).select("-password");

};

export const actualizarRol = async (id, rol) => {

    if (!["cliente", "admin"].includes(rol)) {

        throw new Error("Rol inválido.");

    }

    return await User.findByIdAndUpdate(
        id,
        { rol },
        { new: true }
    ).select("-password");

};

export const eliminarUsuario = async (id) => {

    return await User.findByIdAndDelete(id);

};
