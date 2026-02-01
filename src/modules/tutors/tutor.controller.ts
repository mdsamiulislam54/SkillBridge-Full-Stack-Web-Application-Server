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
        const tutorId = req.user?.id as string;
        console.log(tutorId)
        const tutor = await tutorService.createTutorSlots(req.body, tutorId);
        res.status(201).json({
            message: 'Tutor profile created successfully',
            data: null
        })
    } catch (error) {
        console.error('Error creating tutor profile:', error);
        next(error)
    }
}
const getTutorProfilesById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id
        const tutor = await tutorService.getTutorProfilesById(userId);
        console.log(tutor)
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
const getTutorSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id as string
        console.log(userId)
        const tutor = await tutorService.getTutorSlot(userId);

        res.status(200).json({
            message: 'Tutor slots get successfully',
            data: tutor
        })
    } catch (error) {
        console.error('Error get tutor slots:', error);
        next(error)
    }
}
const tutorDashboardCardData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id as string

        const tutor = await tutorService.tutorDashboardCardData(userId);

        res.status(200).json({
            message: 'Tutor Dashboard Card Data Get successfully',
            data: tutor
        })
    } catch (error) {
        console.error('Tutor Dashboard Card Data Get :', error);
        next(error)
    }
}
const getSlotChartData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id as string
        const tutor = await tutorService.getSlotChartData(userId);
        res.status(200).json({
            message: 'Tutor Dashboard Chart Data Get successfully',
            data: tutor
        })
    } catch (error) {
        console.error('Tutor Dashboard Chart Data Get :', error);
        next(error)
    }
}

const tutorSlotsUpdateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id as string;
        const data = req.body;
        console.log({userId, data})
        // const tutor = await tutorService.tutorSlotsUpdateById(userId, data);
        res.status(200).json({
            message: 'Tutor Slots Update successfully',
            data: null
        })
    } catch (error) {
        next(error)
    }
}
const tutorSlotsDeleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const tutor = await tutorService.tutorSlotsDeleteById(id);
        res.status(200).json({
            message: 'Tutor Slots Delete successfully',
            data: null
        })
    } catch (error) {
        next(error)
    }
}






export const tutorController = {
    createTutorProfile,
    createTutorSlots,
    getTutorProfilesById,
    getTutorProfiles,
    getTutorSlot,
    tutorDashboardCardData,
    getSlotChartData,
    tutorSlotsUpdateById,
    tutorSlotsDeleteById
};