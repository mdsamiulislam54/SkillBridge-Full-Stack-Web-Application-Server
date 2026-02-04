import { NextFunction, Request, Response } from "express";
import { bookingService } from "./booking.service";
const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        console.log(payload)
        const booking = await bookingService.createBooking(req.body);
        res.status(201).json({
            message: ' created booking successfully',
            data: booking
        })
    } catch (error) {
      
        next(error)
    }
}

export const bookingController = {
    createBooking
}