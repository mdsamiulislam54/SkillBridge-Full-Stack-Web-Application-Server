import express, { Application, response } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";

import { tutorRoute } from "./modules/tutors/tutor.route";
import { errorHandler } from "./middleware/errorHanding";
import { adminRoute } from "./modules/admin/admin.route";
import { studentRoute } from "./modules/student/student.route";
import { BookingRouter } from "./modules/booking/booking.route";
import cookieParser from 'cookie-parser';
import { config } from "./config/config";

dotenv.config();
const app: Application = express();
app.use(cookieParser(config.betterAuthSecret));
app.use(express.json());


app.set("trust proxy", 1);
app.use(cors({
    origin: [
        'https://skillbridge-chi-seven.vercel.app',
        'https://skillbridge-server-inky.vercel.app',
        'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        environment: config.isProduction ? 'production' : 'development',
        cookies: req.cookies,
        time: new Date().toISOString()
    });
});
app.all('/api/auth/*splat', toNodeHandler(auth))
app.use('/api/tutor', tutorRoute);
app.use('/api/admin', adminRoute);
app.use('/api/student', studentRoute);
app.use('/api/booking', BookingRouter);


app.use(errorHandler)


export default app;