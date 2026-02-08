import { Review } from "../../../generated/prisma/client"
import { prisma } from "../../../lib/prisma"
import { timeStringToDate } from "../../helper/timeStringToDate"

const getBookingByOwnUser = async (id: string, page: number, limit: number, skip: number) => {

    const result = await prisma.booking.findMany({
        take: limit,
        skip,
        where: { userId: id },

        select: {
            id: true,
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
                    id: true,
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

            review: true



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
        prisma.user.findFirst({ where: { id }, select: { createdAt: true } }),
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
        totalSpent: totalPrice._sum.totalPrice || 0
    }
}

const chartData = async () => {
    const result = await prisma.booking.groupBy({
        by: ["createdAt"],

        _sum: {
            totalPrice: true
        },
        orderBy: { createdAt: "asc" }
    })

    const chart = result.map((item) => ({
        date: item.createdAt.toLocaleDateString(),
        price: item._sum.totalPrice
    }))

    return chart
}

const createReview = async (data: Review) => {
    return await prisma.review.create({ data });
}

const upComingBooking = async (userId: string) => {
    const now = new Date();

    const booking = await prisma.booking.findMany({
        where: {
            userId
        },

        include: {
            tutorSlot: true,
            tutorProfile: true,
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });

    return booking.filter((b) => {
        const start = timeStringToDate(b.tutorSlot.startTime)
        return start > now
    })
}
const pastBooking = async (userId: string) => {
    const now = new Date();

    const booking = await prisma.booking.findMany({
        where: {
            userId
        },

        include: {
            tutorSlot: true,
            tutorProfile: true,
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });

    return booking.filter((b) => {
        const start = timeStringToDate(b.tutorSlot.startTime)
        return start < now
    })
}

export const studentService = {
    getBookingByOwnUser,
    getStudentDashboard,
    chartData,
    createReview,
    upComingBooking,
    pastBooking
}