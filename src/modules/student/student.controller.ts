import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";
import { PaginationOptions } from "../../helper/pagination.helper";


const getBookingByOwnUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {limit, page, skip} = PaginationOptions(req.query)
        const userId = req.user?.id as string
        const booking = await studentService.getBookingByOwnUser(userId, page, limit, skip)
        res.status(201).json({
            message: 'Get booking successfully',
            data: booking
        })
    } catch (error) {
        console.error('Error :', error);
        next(error)
    }
}
const getStudentDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const userId = req.user?.id as string
        const booking = await studentService.getStudentDashboard(userId)
        res.status(201).json({
            message: 'Get booking Data successfully',
            data: booking
        })
    } catch (error) {
        console.error('Error:', error);
        next(error)
    }
}


export const studentController = {
    getBookingByOwnUser,
    getStudentDashboard
}