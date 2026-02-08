import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";
import { PaginationOptions } from "../../helper/pagination.helper";


const getBookingByOwnUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, page, skip } = PaginationOptions(req.query)
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
const chartData = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const booking = await studentService.chartData()
        res.status(201).json({
            message: 'successfully',
            data: booking
        })
    } catch (error) {
        console.error('Error:', error);
        next(error)
    }
}
const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const id = req.user?.id
        const payload = {
            ...data,
            userId: id
        }
        const review = await studentService.createReview(payload)
        res.status(201).json({
            message: 'successfully',
            data: review
        })
    } catch (error) {
        console.error('Error:', error);
        next(error)
    }
}
const upComingBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?.id
        const booking = await studentService.upComingBooking(id)
        res.status(200).json({
            message: 'successfully',
            data: booking
        })
    } catch (error) {
        console.error('Error:', error);
        next(error)
    }
}
const pastBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?.id
        const booking = await studentService.pastBooking(id)
        res.status(200).json({
            message: 'successfully',
            data: booking
        })
    } catch (error) {
        console.error('Error:', error);
        next(error)
    }
}

export const studentController = {
    getBookingByOwnUser,
    getStudentDashboard,
    chartData,
    createReview,
    upComingBooking,
    pastBooking
}