import dotenv from 'dotenv';
dotenv.config();
import express, { Application, response } from "express";

import cors from 'cors'
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";

import { tutorRoute } from "./modules/tutors/tutor.route";
import { errorHandler } from "./middleware/errorHanding";
import { adminRoute } from "./modules/admin/admin.route";
import { studentRoute } from "./modules/student/student.route";
import { BookingRouter } from "./modules/booking/booking.route";
import logger from "./middleware/logger";
import notFound from "./middleware/notFound";


const app: Application = express();
app.use(express.json());
app.set("trust proxy", 1);
app.use(logger);
app.use(cors({
    origin: [
        "http://localhost:5000",
        "http://localhost:3000",
        "https://skillbridge-chi-seven.vercel.app",
        "https://skillbridge-chi-seven.vercel.app",
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  
}))




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

app.all('/api/auth/*any', toNodeHandler(auth));
app.use('/api/tutor', tutorRoute);
app.use('/api/admin', adminRoute);
app.use('/api/student', studentRoute);
app.use('/api/booking', BookingRouter);


app.use(errorHandler);
app.use(notFound);


export default app;