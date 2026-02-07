import express, { Application } from "express";
import AuthVerify, { userRole } from "../../middleware/authVerify";
import { studentController } from "./student.controller";


const studentRouter: Application = express();
studentRouter.get('/booking', AuthVerify(userRole.STUDENT, userRole.ADMIN), studentController.getBookingByOwnUser);
studentRouter.get('/dashboard', AuthVerify(userRole.STUDENT, userRole.ADMIN), studentController.getStudentDashboard);

export const studentRoute = studentRouter