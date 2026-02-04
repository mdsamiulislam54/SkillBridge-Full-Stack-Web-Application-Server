import express, { Application } from "express";
import { bookingController } from "./booking.controller";


const bookingRoute: Application = express();

bookingRoute.post('/', bookingController.createBooking)


export const BookingRouter = bookingRoute