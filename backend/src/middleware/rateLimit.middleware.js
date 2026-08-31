// Rate limiter simple en memoria (sin dependencias externas).
// Para producción con varias instancias del servidor, conviene reemplazarlo
// por una solución centralizada (ej. Redis).

const solicitudesPorIP = new Map();

const rateLimitMiddleware = (opciones = {}) => {

    const ventanaMs = opciones.ventanaMs || 60 * 1000;
    const maxSolicitudes = opciones.maxSolicitudes || 100;

    return (req, res, next) => {

        const ip = req.ip;
        const ahora = Date.now();

        const registro = solicitudesPorIP.get(ip) || {
            contador: 0,
            inicioVentana: ahora
        };

        if (ahora - registro.inicioVentana > ventanaMs) {

            registro.contador = 0;
            registro.inicioVentana = ahora;

        }

        registro.contador += 1;

        solicitudesPorIP.set(ip, registro);

        if (registro.contador > maxSolicitudes) {

            return res.status(429).json({
                success: false,
                message: "Demasiadas solicitudes. Intenta de nuevo más tarde."
            });

        }

        next();

    };

};

export default rateLimitMiddleware;
