import express from "express";

import * as productController from "../controllers/product.controller.js";

import verifyToken from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", productController.obtenerProductos);

router.get("/buscar", productController.buscarProductos);

router.get("/categoria/:id", productController.filtrarCategoria);

router.get("/precio", productController.filtrarPrecio);

router.get("/:id", productController.obtenerProducto);

router.post("/", verifyToken, productController.crearProducto);

router.put("/:id", verifyToken, productController.actualizarProducto);

router.delete("/:id", verifyToken, productController.eliminarProducto);

router.post("/:id/imagen", verifyToken, upload.single("imagen"), productController.subirImagen);

export default router;