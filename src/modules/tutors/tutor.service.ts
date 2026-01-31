import { prisma } from "../../../lib/prisma";
import { ITutorProfile } from "../../type/tutorProfileType";
import { SlotsType } from "../../type/tutorSlots.type";


const createTutorProfile = async (tutorData: ITutorProfile) => {
    return await prisma.tutorProfile.create({
        data: tutorData
    });
}

const createTutorSlots = async (slotsData: SlotsType) => {
    // const tutorProfile = await prisma.tutorProfile.findFirstOrThrow({
    //     where: {
    //         userId: slotsData.userId,
    //         id: slotsData.tutorId
    //     }
    // })
    // if (!tutorProfile) throw new Error("Tutor profile not found.");

    // return await prisma.tutorSlot.create({
    //     data: {

    //         startTime: slotsData.startTime,
    //         endTime: slotsData.endTime,
    //         duration: slotsData.duration,
    //         teachingMode: slotsData.teachingMode,
        
    //         isActive: slotsData.isActive,
    //         tutorId: slotsData.tutorId,
    //     }
    // })
}


const getTutorProfilesByUser = async (userId: string) => {
    return await prisma.tutorProfile.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}
const getTutorProfiles = async () => {
    return await prisma.tutorProfile.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}


export const tutorService = { createTutorProfile, createTutorSlots, getTutorProfilesByUser,getTutorProfiles };