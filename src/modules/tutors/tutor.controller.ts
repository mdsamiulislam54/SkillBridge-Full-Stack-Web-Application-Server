import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { PaginationOptions } from "../../helper/pagination.helper";

const createTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {

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

        const tutorId = req.user?.id as string;

        const tutor = await tutorService.createTutorSlots(req.body, tutorId);
        res.status(201).json({
            message: 'Tutor profile created successfully',
            data: tutor
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
        const id = req.params.slotId as string;
        if (!id) return res.status(400).json({ message: "Slot ID required" });

        const tutor = await tutorService.tutorSlotsUpdateById(id, req.body);

        res.status(200).json({
            message: 'Tutor Slots Update successfully',
            data: tutor
        })
    } catch (error) {
        next(error)
    }
}
const tutorProfileUpdateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.profileId as string;
        if (!id) return res.status(400).json({ message: "Slot ID required" });

        const tutor = await tutorService.tutorProfileUpdateById(id, req.body);
        res.status(200).json({
            message: 'Tutor Profile Update successfully',
            data: tutor
        })
    } catch (error) {
        next(error)
    }
}
const tutorSlotsDeleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ message: "Slot ID required" });

        const tutor = await tutorService.tutorSlotsDeleteById(id);
        res.status(200).json({
            message: 'Tutor Slots Delete successfully',
            data: null
        })
    } catch (error) {
        next(error)
    }
}
const tutorProfileDeleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        if (!id) throw Error("Slot ID required")
        console.log(id)
        const tutor = await tutorService.tutorProfileDeleteById(id);
        res.status(200).json({
            message: 'Tutor Profile Delete successfully',
            data: tutor
        })
    } catch (error) {
        next(error)
    }
}
const getAllTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { skip, limit, search ,page} = PaginationOptions(req.query);
        const payload = {
            skip,
            limit,
            search,
            page
        }

    
        const tutorProfile = await tutorService.getAllTutorProfile(payload);
        res.status(200).json({
            message: 'Tutor Profile Get successfully',
            data: tutorProfile
        })
    } catch (error) {
        next(error)
    }
}
const GetSingleTutorProfileById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string
        const tutorProfile = await tutorService.GetSingleTutorProfileById(id);
        res.status(200).json({
            message: 'Tutor Profile Get successfully',
            data: tutorProfile
        })
    } catch (error) {
        next(error)
    }
}
const getTutorBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.user) return "User not authenticated";
        const {page,skip,limit} = PaginationOptions(req.query)
        const id = req.user?.id;
        console.log("user Id :", id)
        const tutorBooking = await tutorService.getTutorBooking(id, {page,skip,limit});
        res.status(200).json({
            message: 'Tutor Booking Get successfully',
            data: tutorBooking
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
    tutorSlotsDeleteById,
    tutorProfileUpdateById,
    tutorProfileDeleteById,
    getAllTutorProfile,
    GetSingleTutorProfileById,
    getTutorBooking
};