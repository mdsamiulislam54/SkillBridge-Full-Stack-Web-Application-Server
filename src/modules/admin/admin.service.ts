
import { prisma } from "../../../lib/prisma"
import { userRole } from "../../middleware/authVerify"
import { Category } from "../../type/category.type"

import { UserWhereInput } from "../../../generated/prisma/models"


const createCategory = async (category: Category) => {
    return await prisma.category.create({ data: category })

}
const getCategory = async () => {
    return await prisma.category.findMany({
        orderBy: {
            sortOrder: "asc"
        }
    })

}

const getAdminDashboardCard = async () => {
    const [totalEarning, totalStudent, totalTutor, totalBooking] = await Promise.all([
        prisma.booking.aggregate({
            _sum: { totalPrice: true }
        }),
        prisma.user.count({
            where: {
                role: userRole.STUDENT
            }
        }),
        prisma.user.count({
            where: {
                role: userRole.TUTOR
            }
        }),

        prisma.booking.count(),

    ])

    return {
        totalEarning: totalEarning._sum.totalPrice,
        totalStudent,
        totalTutor,
        totalBooking
    }
}

const adminChartData = async () => {
    const result = await prisma.booking.groupBy({
        by: ["createdAt"],
        where: { paymentStatus: "PAID" },
        _sum: { totalPrice: true },

        orderBy: { createdAt: "asc" }
    })

    const chartData = result.map((item) => {
        return ({
            date: item.createdAt.toLocaleDateString(),
            price: item._sum.totalPrice
        })
    })

    return chartData
}

const getAllUser = async ({ page, limit, skip, search, sort }: { page: number, limit: number, skip: number, search: string, sort: string }) => {
    const whereConditions: UserWhereInput[] = []

    if (search) {
        whereConditions.push({
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    }
                },

                {
                    email: search,

                },
                ...(search.length > 10 ? [
                    {
                        id: search
                    }
                ] : [])
            ]
        })
    }

    if (sort) {
        if (["STUDENT", "TUTOR", "ADMIN"].includes(sort)) {
            whereConditions.push({
                role: sort
            })
        }

        if (["ACTIVE", "BAN"].includes(sort)) {
            whereConditions.push({
                status: sort as any,
            })
        }
        if (sort === 'all') {

        }
    }


    const result = await prisma.user.findMany({
        take: limit,
        skip,
        where: {
            AND: whereConditions
        },

        orderBy: { createdAt: "asc" }

    })

    const total = await prisma.user.count({ where: { AND: whereConditions } });

    return {
        result,
        pagination: {
            total,
            page,
            limit,
            totalPage: Math.ceil(total / limit)

        }
    }

}

const updateUserStatus = async (userId: string, status: string) => {
    if (!["ACTIVE", "BAN", "UNBAN"].includes(status)) {
        throw new Error("Invalid status")
    }

    return await prisma.user.update({
        where: { id: userId },
        data: {
            status: status
        }

    })
}

const getAllBooking = async ({ page, limit, skip }: { page: number, limit: number, skip: number }) => {
    const result = await prisma.booking.findMany({
        take: limit,
        skip,
        select: {
            bookingStatus: true,
            paymentStatus: true,
            totalPrice: true,
            tutorProfile: {
                select: {
                    name: true,

                }
            },
            tutorSlot: {
                select: {
                    duration: true,
                    startTime: true,
                    endTime: true,
                    teachingMode: true
                }
            },
            user: {
                select: {
                    email: true
                }
            }
        },
        orderBy: { createdAt: 'asc' }
    });
    const total = await prisma.booking.count();

    return {
        result,
        pagination: {
            page,
            total,
            limit,
            totalPage: Math.ceil(total / limit)
        }
    }
}

const updateCategory = async (id: string, payload: Partial<{
    name: string;
    icon: string;
    description: string;
    isActive: boolean;
    sortOrder: number;
}>
) => {
    return await prisma.category.update({
        where: { id },
        data: payload,
    });
};

const deletedCategory = async(id:string)=>{
    return await prisma.category.delete({where:{id}})
}


export const adminService = {
    createCategory,
    getCategory,
    getAdminDashboardCard,
    adminChartData,
    getAllUser,
    updateUserStatus,
    getAllBooking,
    updateCategory,
    deletedCategory

}