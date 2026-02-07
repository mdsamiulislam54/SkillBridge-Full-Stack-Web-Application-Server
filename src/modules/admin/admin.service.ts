import { date } from "better-auth"
import { prisma } from "../../../lib/prisma"
import { userRole } from "../../middleware/authVerify"
import { Category } from "../../type/category.type"

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
            date:item.createdAt.toLocaleDateString(),
            price: item._sum.totalPrice
        })
    })

    return chartData
}

export const adminService = {
    createCategory,
    getCategory,
    getAdminDashboardCard,
    adminChartData
}