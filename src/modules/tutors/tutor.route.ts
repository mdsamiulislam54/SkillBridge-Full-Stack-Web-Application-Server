import express, { Application } from "express";
import { tutorController } from "./tutor.controller";

const tutorRouter: Application = express();
tutorRouter.get('/', (req, res) => {
    res.send('Tutor route');
});

tutorRouter.post('/create', tutorController.createTutorProfile);


export const tutorRoute = tutorRouter;