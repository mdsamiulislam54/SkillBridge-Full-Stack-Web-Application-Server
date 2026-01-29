import { prisma } from "../../../lib/prisma";
import { ITutorProfile } from "../../type/tutorProfileType";


const createTutorProfile = async (tutorData: ITutorProfile) => {
    return await prisma.tutorProfile.create({
        data: tutorData
    });
}


export const tutorService = { createTutorProfile };