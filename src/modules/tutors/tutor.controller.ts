import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";

const createTutorProfile = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const tutor = await tutorService.createTutorProfile(req.body);
        res.status(201).json({
            message: 'Tutor profile created successfully',
            data: tutor
        })
    } catch (error) {
        console.error('Error creating tutor profile:', error);
        next(error)
    }
}


export const tutorController = { createTutorProfile };