import { TutorProfile } from "../../../generated/prisma/client";
import { TutorProfileWhereInput } from "../../../generated/prisma/models";
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
        where: { userId: slotsData.id }

    })

    return await prisma.tutorSlot.create({
        data: {
            startTime: slotsData.startTime,
            endTime: slotsData.endTime,
            duration: slotsData.duration,
            teachingMode: slotsData.teachingMode,
            category: slotsData.category,
            hourlyRate: Number(slotsData.hourlyRate) || 0,
            maxStudent: Number(slotsData.maxStudents) || 0,
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
            where: { bookingStatus: "COMPLETED", tutorProfile: {userId:tutorId} },
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
    console.log(tutorId)
    const booking = await prisma.booking.findMany({
        where:{tutorProfileId:tutorId}
    });

    console.log("booking", booking)
    const result = await prisma.booking.groupBy({
        by: ['createdAt'],
        where:{
          tutorProfile:{
            userId:tutorId
          }
        },
        _sum: {
            totalPrice: true
        },
        orderBy: {
            createdAt: 'asc',
        },
    })



    const data = result.map(item => ({
        date: item.createdAt.toISOString().split("T")[0],
        total: item._sum.totalPrice,
    }));

    return data

}

const tutorSlotsUpdateById = async (tutorId: string, data: Partial<SlotsType>) => {

    const slot = await prisma.tutorSlot.findUniqueOrThrow({ where: { id: tutorId } })

    const update = await prisma.tutorSlot.update({
        where: { id: tutorId },
        data
    })

    return update
}
const tutorProfileUpdateById = async (id: string, data: Partial<TutorProfile>) => {
    const update = await prisma.tutorProfile.update({
        where: { id },
        data
    })

    return update
}
const tutorSlotsDeleteById = async (id: string) => {
    return await prisma.tutorSlot.delete({
        where: { id },

    })
}
const tutorProfileDeleteById = async (id: string) => {

    const tutor = await prisma.tutorProfile.findUniqueOrThrow({
        where: { id: id }
    });


    console.log(tutor)
    return await prisma.tutorProfile.delete({
        where: { id: tutor.id },

    })
}

const getAllTutorProfile = async (payload: { limit: number, skip: number, search: string, page: number }) => {

    let whereConditions: TutorProfileWhereInput[] = [];

    if (payload.search) {
        whereConditions.push({
            OR: [
                {
                    name: {
                        contains: payload.search as string,
                        mode: "insensitive"
                    },


                },

                {
                    education: {
                        contains: payload.search as string,
                        mode: "insensitive"
                    }
                },

                {
                    bio: {
                        contains: payload.search as string,
                        mode: "insensitive"
                    }
                },
                {
                    tutorSlots: {
                        every: {
                            category: {
                                contains: payload.search as string,
                                mode: "insensitive"
                            }
                        }
                    }
                },

            ]
        })
    }



    const result = await prisma.tutorProfile.findMany({
        take: payload.limit,
        skip: payload.skip,
        where: {
            AND: whereConditions
        },
        include: {
            tutorSlots: {
                include: {
                    tutorProfile: {
                        select: { id: true }
                    }
                }
            },

            reviews: true,

        },
        orderBy: { averageRating: "asc" }
    });

    const total = await prisma.tutorProfile.count({ where: { AND: whereConditions } });
    return {
        result,
        pagination: {
            total,
            page: payload.page,
            limit: payload.limit,
            totalPage: Math.ceil(total / payload.limit)

        }
    }
}

const GetSingleTutorProfileById = async (id: string) => {

    return await prisma.tutorProfile.findFirst({
        where: { id },
        include: {
            reviews: true,
            tutorSlots: true,

        }
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
    tutorSlotsDeleteById,
    tutorProfileUpdateById,
    tutorProfileDeleteById,
    getAllTutorProfile,
    GetSingleTutorProfileById
};