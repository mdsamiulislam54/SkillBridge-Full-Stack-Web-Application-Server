import { NextFunction, Request, Response } from "express";


const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.status(201).json({
            message: 'Tutor profile created successfully',
            data: null
        })
    } catch (error) {
        console.error('Error creating tutor profile:', error);
        next(error)
    }
}


export const studentController = {}