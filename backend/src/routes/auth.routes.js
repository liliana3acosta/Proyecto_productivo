import express from "express";

import {
    register,
    login,
    profile,
    forgotPassword, // <-- Agregamos esto
    resetPassword   // <-- Agregamos esto
} from "../controllers/auth.controller.js";

import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, profile);

// --- NUEVAS RUTAS DE CONTRASEÑA ---
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;