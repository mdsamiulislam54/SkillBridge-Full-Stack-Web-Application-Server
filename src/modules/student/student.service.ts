import { prisma } from "../../../lib/prisma"

const getBookingByOwnUser = async (id: string, page: number, limit: number, skip: number) => {

    const result = await prisma.booking.findMany({
        take: limit,
        skip,
        where: { userId: id },

        select: {
            totalPrice: true,
            createdAt: true,
            paymentStatus: true,
            bookingStatus: true,
            user: {
                select: {
                    name: true,
                    email: true
                }
            },
            tutorProfile: {
                select: {
                    profileImage: true,
                    teachingMode: true
                }
            },

            tutorSlot: {
                select: {
                    category: true,
                    duration: true,

                }
            },

            review:true



        },

        orderBy: {
            createdAt: "asc"
        }
    })

    const total = await prisma.booking.count({ where: { userId: id } })

    return {
        result,
        pagination: {
            total,
            page,
            limit,
            totalPage: Number(Math.floor(total / limit))
        }
    }
}

const getStudentDashboard = async (id: string) => {
    const [totalBooking, accountCreated, completedBooking, pendingBooking, cancelledBooking, totalPrice] = await Promise.all([
        prisma.booking.count(),
        prisma.user.findFirst({where:{id}, select: { createdAt: true } }),
        prisma.booking.count(

            {
                where: { userId: id, bookingStatus: 'COMPLETED' },

            }),
        prisma.booking.count(

            {
                where: { userId: id, bookingStatus: 'PENDING' },

            }),
        prisma.booking.count(

            {
                where: { userId: id, bookingStatus: 'CANCELLED' },

            }),

        prisma.booking.aggregate({
            where: { userId: id },
            _sum: {
                totalPrice: true
            }
        })


    ])

    return {
        totalBooking,
        accountCreated,
        completedBooking,
        pendingBooking,
        cancelledBooking,
        totalSpent : totalPrice._sum.totalPrice || 0
    }
}


export const studentService = {
    getBookingByOwnUser,
    getStudentDashboard
}