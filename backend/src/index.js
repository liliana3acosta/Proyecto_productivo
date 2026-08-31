import express from "express";
import cors from "cors";

import env from "./config/env.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import userRoutes from "./routes/user.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import loggerMiddleware from "./middleware/logger.middleware.js";
import rateLimitMiddleware from "./middleware/rateLimit.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(rateLimitMiddleware({ ventanaMs: 60 * 1000, maxSolicitudes: 200 }));

// Sirve las imágenes subidas por multer (ver middleware/upload.middleware.js)
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.json({ mensaje: "Backend funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorMiddleware);

connectDB().then(() => {

    app.listen(env.PORT, () => {
        console.log(`Servidor en http://localhost:${env.PORT}`);
    });

});
