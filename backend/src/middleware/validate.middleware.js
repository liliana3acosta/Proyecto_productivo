import { validationResult } from "express-validator";

const validate = (req, res, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        return res.status(400).json({
            success: false,
            errores: errores.array().map(e => ({
                campo: e.path,
                mensaje: e.msg
            }))
        });

    }

    next();

};

export default validate;
