import { prisma } from "../../../lib/prisma"

const getBookingByOwnUser = async (id: string) => {
    return await prisma.booking.findMany({
        where: { userId: id },
        
        select: {
            totalPrice:true,
            createdAt:true,
            paymentStatus:true,
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

        
        
        }
    })
}

export const studentService = {
    getBookingByOwnUser
}