import express from "express";

import * as userController from "../controllers/user.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import checkRole from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", verifyToken, checkRole("admin"), userController.obtenerUsuarios);

router.get("/:id", verifyToken, userController.obtenerUsuario);

router.put("/perfil", verifyToken, userController.actualizarPerfil);

router.put("/:id/perfil", verifyToken, checkRole("admin"), userController.actualizarPerfil);

router.put("/:id/rol", verifyToken, checkRole("admin"), userController.actualizarRol);

router.delete("/:id", verifyToken, checkRole("admin"), userController.eliminarUsuario);

export default router;
