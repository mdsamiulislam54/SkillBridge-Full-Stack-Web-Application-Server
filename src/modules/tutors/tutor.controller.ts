import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";

const createTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const tutor = await tutorService.createTutorProfile(req.body);
        res.status(201).json({
            message: 'Tutor profile created successfully',
            data: null
        })
    } catch (error) {
        console.error('Error creating tutor profile:', error);
        next(error)
    }
}
const createTutorSlots = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const tutor = await tutorService.createTutorSlots(req.body);
        res.status(201).json({
            message: 'Tutor profile created successfully',
            data: tutor
        })
    } catch (error) {
        console.error('Error creating tutor profile:', error);
        next(error)
    }
}
const getTutorProfilesByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id
        const tutor = await tutorService.getTutorProfilesByUser(userId);
        console.log(userId)
        res.status(200).json({
            message: 'Tutor profile get successfully',
            data: tutor
        })
    } catch (error) {
        console.error('Error get tutor profile:', error);
        next(error)
    }
}
const getTutorProfiles = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const tutor = await tutorService.getTutorProfiles();

        res.status(200).json({
            message: 'Tutor profile get successfully',
            data: tutor
        })
    } catch (error) {
        console.error('Error get tutor profile:', error);
        next(error)
    }
}






export const tutorController = { createTutorProfile, createTutorSlots, getTutorProfilesByUser, getTutorProfiles };