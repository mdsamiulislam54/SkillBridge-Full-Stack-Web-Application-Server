import express, { Application } from "express";
import { tutorController } from "./tutor.controller";
import AuthVerify, { userRole } from "../../middleware/authVerify";

const tutorRouter: Application = express();
tutorRouter.get('/', (req, res) => {
    res.send('Tutor route');
});

tutorRouter.post('/create', AuthVerify(userRole.ADMIN, userRole.TUTOR, userRole.STUDENT), tutorController.createTutorProfile);


export const tutorRoute = tutorRouter;