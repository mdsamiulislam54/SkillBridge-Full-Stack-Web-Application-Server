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
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { config } from "./config/config";

dotenv.config();
const app: Application = express();
app.use(cookieParser(config.betterAuthSecret));
app.use(express.json());
app.use(session({
    secret: config.betterAuthSecret || "",
    resave: false,
    saveUninitialized: false,
    name: 'skillbridge.sid',
    proxy: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        domain: process.env.NODE_ENV === 'production'
            ? '.onrender.com'
            : 'localhost',
        path: '/'
    }
}));

app.set("trust proxy", 1);
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
            'https://skillbridge-chi-seven.vercel.app',
            config.appUrl,
            config.betterAuthUrl
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));


app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        environment: config.isProduction ? 'production' : 'development',
        sessionID: req.sessionID,
        cookies: req.cookies,
        time: new Date().toISOString()
    });
});
app.use('/api/tutor', tutorRoute);
app.use('/api/admin', adminRoute);
app.use('/api/student', studentRoute);
app.use('/api/booking', BookingRouter);
app.all('/api/auth/*splat', toNodeHandler(auth), (req, res) => {
    res.send({ "Better Auth ": req });
});

app.use(errorHandler)


export default app;