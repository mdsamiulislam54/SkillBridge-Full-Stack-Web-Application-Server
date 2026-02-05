import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";


const getBookingByOwnUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id as string
        const booking = await studentService.getBookingByOwnUser(userId)
        res.status(201).json({
            message: 'Get booking successfully',
            data: booking
        })
    } catch (error) {
        console.error('Error creating tutor profile:', error);
        next(error)
    }
}


export const studentController = {
    getBookingByOwnUser
}