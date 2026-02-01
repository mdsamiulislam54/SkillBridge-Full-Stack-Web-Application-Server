import express, { Application } from "express";
import { tutorController } from "./tutor.controller";
import AuthVerify, { userRole } from "../../middleware/authVerify";

const tutorRouter: Application = express();
tutorRouter.get('/', (req, res) => {
    res.send('Tutor route');
});
tutorRouter.get('/get-profile', AuthVerify(userRole.TUTOR), tutorController.getTutorProfilesById);
tutorRouter.get('/get-profile/all', tutorController.getTutorProfiles);
tutorRouter.get('/slots', AuthVerify(userRole.TUTOR), tutorController.getTutorSlot);
tutorRouter.get('/dashboard', AuthVerify(userRole.TUTOR), tutorController.tutorDashboardCardData);
tutorRouter.get('/dashboard/chart-data', AuthVerify(userRole.TUTOR), tutorController.getSlotChartData);

tutorRouter.post('/create', AuthVerify(userRole.ADMIN, userRole.TUTOR, userRole.STUDENT), tutorController.createTutorProfile);
tutorRouter.post('/create/slots', AuthVerify(userRole.ADMIN, userRole.TUTOR, ), tutorController.createTutorSlots);


tutorRouter.patch('/slots/:id', AuthVerify(userRole.ADMIN, userRole.TUTOR, ), tutorController.tutorSlotsUpdateById);


tutorRouter.delete('/slots/:id', AuthVerify( userRole.ADMIN, userRole.TUTOR, ), tutorController.tutorSlotsDeleteById);




export const tutorRoute = tutorRouter;