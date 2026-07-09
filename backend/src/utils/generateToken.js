import jwt from "jsonwebtoken";

const generateToken = (id, rol) => {

    return jwt.sign(
        {id,rol},
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );

}

export default generateToken;