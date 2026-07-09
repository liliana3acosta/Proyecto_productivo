import express from "express";

import * as categoryController from "../controllers/category.controller.js";

import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",categoryController.obtenerCategorias);

router.get("/:id",categoryController.obtenerCategoria);

router.post("/",verifyToken,categoryController.crearCategoria);

router.put("/:id",verifyToken,categoryController.actualizarCategoria);

router.delete("/:id",verifyToken,categoryController.eliminarCategoria);

export default router;