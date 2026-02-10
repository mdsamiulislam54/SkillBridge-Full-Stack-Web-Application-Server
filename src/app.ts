import express, { Application } from "express";
import dotenv from 'dotenv'
import { config } from './config/config'
import cors from 'cors'
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import AuthVerify, { userRole } from "./middleware/authVerify";
import { tutorRoute } from "./modules/tutors/tutor.route";
import { errorHandler } from "./middleware/errorHanding";
import { adminRoute } from "./modules/admin/admin.route";
import { studentRoute } from "./modules/student/student.route";
import { BookingRouter } from "./modules/booking/booking.route";


dotenv.config();
const app: Application = express();
app.use(express.json())


app.use(cors({
    origin: [config.appUrl, config.betterAuthUrl, "https://skillbridge-chi-seven.vercel.app"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS',"PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.get('/health', AuthVerify(userRole.STUDENT, userRole.ADMIN, userRole.TUTOR), (req, res) => {
    res.status(200).send('OK');
});
app.use('/api/tutor', tutorRoute);
app.use('/api/admin', adminRoute);
app.use('/api/student', studentRoute);
app.use('/api/booking', BookingRouter);
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(errorHandler)


export default app;