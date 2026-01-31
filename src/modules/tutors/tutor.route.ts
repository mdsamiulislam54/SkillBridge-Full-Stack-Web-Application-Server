import express, { Application } from "express";
import { tutorController } from "./tutor.controller";
import AuthVerify, { userRole } from "../../middleware/authVerify";

const tutorRouter: Application = express();
tutorRouter.get('/', (req, res) => {
    res.send('Tutor route');
});

tutorRouter.post('/create', AuthVerify(userRole.ADMIN, userRole.TUTOR, userRole.STUDENT), tutorController.createTutorProfile);
tutorRouter.post('/create/slots', AuthVerify(userRole.ADMIN, userRole.TUTOR, userRole.STUDENT), tutorController.createTutorSlots);
tutorRouter.get('/get-profile', AuthVerify(userRole.TUTOR), tutorController.getTutorProfilesByUser);
tutorRouter.get('/get-profile/all', tutorController.getTutorProfiles);


export const tutorRoute = tutorRouter;