import express, { Application } from "express";
import AuthVerify, { userRole } from "../../middleware/authVerify";
import { studentController } from "./student.controller";


const studentRouter: Application = express();
studentRouter.get('/upcoming/booking', AuthVerify(userRole.STUDENT, userRole.ADMIN), studentController.upComingBooking);
studentRouter.get('/past/booking', AuthVerify(userRole.STUDENT, userRole.ADMIN), studentController.pastBooking);
studentRouter.get('/booking', AuthVerify(userRole.STUDENT, userRole.ADMIN), studentController.getBookingByOwnUser);
studentRouter.get('/dashboard', AuthVerify(userRole.STUDENT, userRole.ADMIN), studentController.getStudentDashboard);
studentRouter.get('/dashboard/chart', AuthVerify(userRole.STUDENT, userRole.ADMIN), studentController.chartData);



studentRouter.post('/review', AuthVerify(userRole.STUDENT, userRole.ADMIN), studentController.createReview);

export const studentRoute = studentRouter