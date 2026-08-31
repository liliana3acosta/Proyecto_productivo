import express from "express";

import verifyToken from "../middleware/auth.middleware.js";
import checkRole from "../middleware/role.middleware.js";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

router.get("/resumen", verifyToken, checkRole("admin"), async (req, res) => {

    try {

        const [totalUsuarios, totalProductos, ordenes, citasPendientes] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Order.find(),
            Appointment.countDocuments({ estado: "pendiente" })
        ]);

        const totalVentas = ordenes
            .filter(o => o.estado !== "cancelado")
            .reduce((total, o) => total + o.total, 0);

        res.json({
            totalUsuarios,
            totalProductos,
            totalOrdenes: ordenes.length,
            totalVentas,
            citasPendientes
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

export default router;
