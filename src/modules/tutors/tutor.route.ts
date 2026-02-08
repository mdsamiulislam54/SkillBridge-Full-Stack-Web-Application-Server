import express, { Application } from "express";
import { tutorController } from "./tutor.controller";
import AuthVerify, { userRole } from "../../middleware/authVerify";

const tutorRouter: Application = express();
tutorRouter.get('/booking', AuthVerify(userRole.TUTOR),  tutorController.getTutorBooking);

tutorRouter.get('/get-profile', AuthVerify(userRole.TUTOR), tutorController.getTutorProfilesById);
tutorRouter.get('/get-profile/all', tutorController.getTutorProfiles);
tutorRouter.get('/slots', AuthVerify(userRole.TUTOR), tutorController.getTutorSlot);
tutorRouter.get('/dashboard', AuthVerify(userRole.TUTOR), tutorController.tutorDashboardCardData);
tutorRouter.get('/dashboard/chart-data', AuthVerify(userRole.TUTOR, userRole.ADMIN), tutorController.getSlotChartData);
tutorRouter.get('/',  tutorController.getAllTutorProfile);
tutorRouter.get('/:id',  tutorController.GetSingleTutorProfileById);


tutorRouter.post('/create', AuthVerify(userRole.ADMIN, userRole.TUTOR, userRole.STUDENT), tutorController.createTutorProfile);
tutorRouter.post('/create/slots', AuthVerify(userRole.ADMIN, userRole.TUTOR, ), tutorController.createTutorSlots);


tutorRouter.patch('/slots/update/:slotId', AuthVerify(userRole.ADMIN, userRole.TUTOR ), tutorController.tutorSlotsUpdateById);

tutorRouter.patch('/profile/update/:profileId', AuthVerify(userRole.ADMIN, userRole.TUTOR ), tutorController.tutorProfileUpdateById);


tutorRouter.delete('/slots/:id', AuthVerify( userRole.ADMIN, userRole.TUTOR ), tutorController.tutorSlotsDeleteById);
tutorRouter.delete('/profile/:id', AuthVerify( userRole.ADMIN, userRole.TUTOR ), tutorController.tutorProfileDeleteById);




export const tutorRoute = tutorRouter;