import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve("uploads");

if (!fs.existsSync(uploadDir)) {

    fs.mkdirSync(uploadDir, { recursive: true });

}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, uploadDir);

    },

    filename: (req, file, cb) => {

        const nombreUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;

        cb(null, nombreUnico);

    }

});

const filtroArchivo = (req, file, cb) => {

    const tiposPermitidos = /jpeg|jpg|png|webp/;
    const extensionValida = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
    const mimeValido = tiposPermitidos.test(file.mimetype);

    if (extensionValida && mimeValido) {

        return cb(null, true);

    }

    cb(new Error("Solo se permiten imágenes (jpg, jpeg, png, webp)."));

};

const upload = multer({
    storage,
    fileFilter: filtroArchivo,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export default upload;
