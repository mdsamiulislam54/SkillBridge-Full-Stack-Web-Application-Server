import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";

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

export const adminController = { createCategory ,getCategory}