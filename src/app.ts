import express, { Application, response } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";

import { tutorRoute } from "./modules/tutors/tutor.route";
import { errorHandler } from "./middleware/errorHanding";
import { adminRoute } from "./modules/admin/admin.route";
import { studentRoute } from "./modules/student/student.route";
import { BookingRouter } from "./modules/booking/booking.route";
import cookieParser from 'cookie-parser';
import { config } from "./config/config";
import logger from "./middleware/logger";
import notFound from "./middleware/notFound";

dotenv.config();
const app: Application = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json());
app.set("trust proxy", 1);
app.use(
    cors({
        origin: (origin, callback) => {
            const allowed = config.appUrl?.replace(/\/$/, "");
            if (!origin || origin.replace(/\/$/, "") === allowed) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    }),
);
app.use(logger);
app.all('/api/auth/*any', toNodeHandler(auth))
app.get("/", (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    res.status(200).json({
        success: true,
        data: {
            message: "Server is running",
            author: "Md Shamiul Islam",
            version: "1.0.0",
            host: req.hostname,
            protocol: req.protocol,
            ip: ip,
            time: new Date().toISOString(),
        },
    });
});




app.use('/api/tutor', tutorRoute);
app.use('/api/admin', adminRoute);
app.use('/api/student', studentRoute);
app.use('/api/booking', BookingRouter);


app.use(errorHandler);
app.use(notFound)


export default app;