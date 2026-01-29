import express, { Application } from "express";
import dotenv from 'dotenv'
import { config } from './config/config'

import cors from 'cors'
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import AuthVerify, { userRole } from "./middleware/authVerify";
import { errorHander } from "./middleware/errorHanding";
import { tutorRoute } from "./modules/tutors/tutor.route";


dotenv.config();
const app: Application = express();
app.use(express.json())


app.use(cors({
    origin: [config.appUrl, config.betterAuthUrl],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.get('/health', AuthVerify(userRole.USER), (req, res) => {
    res.status(200).send('OK');
});
app.use('/api/tutor', tutorRoute);
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(errorHander)


export default app;