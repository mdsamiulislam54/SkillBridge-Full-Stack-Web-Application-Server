import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import { PaginationOptions } from "../../helper/pagination.helper";
import { User } from "../../../generated/prisma/client";
import { UserStatus } from "../../type/user.status.type";

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = req.body;
        console.log(category)
        await adminService.createCategory(category)

        res.status(200).json({
            message: 'Category Create successfully',

        })
    } catch (error) {
        console.error('Error Create Category:', error);
        next(error)
    }
}
const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = await adminService.getCategory()

        res.status(200).json({
            message: 'Get Category successfully',
            data
        })
    } catch (error) {
        console.error('Error Get Category:', error);
        next(error)
    }
}
const getAdminDashboardCard = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = await adminService.getAdminDashboardCard()

        res.status(200).json({
            message: 'successful',
            data
        })
    } catch (error) {
        console.error('Error :', error);
        next(error)
    }
}
const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit, skip, search, sort } = PaginationOptions(req.query)
        const data = await adminService.getAllUser({page, limit, skip, search, sort})

        res.status(200).json({
            message: 'successful',
            data
        })
    } catch (error) {
        console.error('Error :', error);
        next(error)
    }
}
const adminChartData = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = await adminService.adminChartData()

        res.status(200).json({
            message: 'successful',
            data
        })
    } catch (error) {
        console.error('Error :', error);
        next(error)
    }
}
const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.params.id as string;
        const status = req.query.status as string ;
        console.log({userId, status})
        const data = await adminService.updateUserStatus(userId, status)

        res.status(200).json({
            message: 'successful',
            data
        })
    } catch (error) {
        console.error('Error :', error);
        next(error)
    }
}

export const adminController = { createCategory, getCategory, getAdminDashboardCard, adminChartData, getAllUser ,updateUserStatus}