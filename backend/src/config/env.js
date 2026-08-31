import dotenv from "dotenv";

dotenv.config();

const env = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/proyecto_productivo",
    JWT_SECRET: process.env.JWT_SECRET || "dev_secret_cambiar_en_produccion",
    NODE_ENV: process.env.NODE_ENV || "development"
};

export default env;
