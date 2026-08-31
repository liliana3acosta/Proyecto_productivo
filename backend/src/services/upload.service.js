// Construye la URL pública de un archivo subido por multer (ver upload.middleware.js).
// Los archivos quedan servidos en /uploads (ver index.js: app.use("/uploads", ...)).
export const construirUrlArchivo = (req, filename) => {

    return `${req.protocol}://${req.get("host")}/uploads/${filename}`;

};
