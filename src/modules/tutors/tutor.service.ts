import { prisma } from "../../../lib/prisma";
import { ITutorProfile } from "../../type/tutorProfileType";
import { SlotsType } from "../../type/tutorSlots.type";


const createTutorProfile = async (tutorData: ITutorProfile) => {
    return await prisma.tutorProfile.create({
        data: tutorData
    });
}

const createTutorSlots = async (slotsData: SlotsType, tutorId: string) => {
    const tutor = await prisma.tutorProfile.findUniqueOrThrow({
        where: { userId: tutorId }

    })
    console.log(tutor, "Tutor")


    return await prisma.tutorSlot.create({
        data: {
            startTime: slotsData.startTime,
            endTime: slotsData.endTime,
            duration: slotsData.duration,
            teachingMode: slotsData.teachingMode,
            category: slotsData.categories,
            hourlyRate: Number(slotsData.hourlyRate),
            maxStudent: Number(slotsData.maxStudents),
            isActive: slotsData.isActive,
            tutorId: tutor.id
        }
    })
}


const getTutorProfilesById = async (userId: string) => {
    return await prisma.tutorProfile.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}
const getTutorSlot = async (userId: string) => {
    return await prisma.tutorSlot.findMany({
        where: {
            tutorProfile: {
                userId: userId
            },

        },
        orderBy: {
            createdAt: "desc"
        },

        include: {

            tutorProfile: {
                select: {
                    name: true,

                }
            }

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

const tutorDashboardCardData = async (tutorId: string) => {
    const [totalSlot, totalEarning, averageRating, totalBooking] = await Promise.all([
        prisma.tutorSlot.count({
            where: {
                tutorProfile: {
                    userId: tutorId
                }
            }
        }),
        prisma.booking.aggregate({
            where: { bookingStatus: "CONFIRMED", userId: tutorId },
            _sum: { totalPrice: true }
        }),
        prisma.tutorProfile.aggregate({
            where: { userId: tutorId },
            _avg: { averageRating: true }
        }),
        prisma.booking.count(),
    ])

    return {
        totalSlot,
        totalBooking,
        totalEarning: totalEarning._sum.totalPrice ?? 0,
        averageRating: averageRating._avg.averageRating ?? 0
    }
}

const getSlotChartData = async (tutorId: string) => {
    const result = await prisma.tutorSlot.groupBy({
        by: ['createdAt'],
        where: {
            tutorProfile: {
                userId: tutorId
            }
        },
        _count: {
            id: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    })

    console.log(result)

    const data = result.map(item => ({
        date: item.createdAt.toISOString().split("T")[0],
        total: item._count.id,
    }));

    return data

}

const tutorSlotsUpdateById = async (id: string, data: SlotsType) => {
    return prisma.tutorSlot.updateMany({
        where: { id },
        data
    })
}
const tutorSlotsDeleteById = async (id: string) => {
    return prisma.tutorSlot.delete({
        where: { id },

    })
}


export const tutorService = {
    createTutorProfile,
    createTutorSlots,
    getTutorProfiles,
    getTutorProfilesById,
    getTutorSlot,
    tutorDashboardCardData,
    getSlotChartData,
    tutorSlotsUpdateById,
    tutorSlotsDeleteById
};