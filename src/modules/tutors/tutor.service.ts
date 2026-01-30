import { prisma } from "../../../lib/prisma";
import { ITutorProfile } from "../../type/tutorProfileType";
import { SlotsType } from "../../type/tutorSlots.type";


const createTutorProfile = async (tutorData: ITutorProfile) => {
    return await prisma.tutorProfile.create({
        data: tutorData
    });
}

const createTutorSlots = async (slotsData: SlotsType) => {
    const tutorProfile = await prisma.tutorProfile.findFirstOrThrow({
        where:{userId: slotsData.tutorId}
    })
    if (!tutorProfile) throw new Error("Tutor profile not found.");
    const slots =  await prisma.tutorSlot.create({
        data: {
            ...slotsData,
            tutorId: tutorProfile.id
        }
    })
}


export const tutorService = { createTutorProfile, createTutorSlots };