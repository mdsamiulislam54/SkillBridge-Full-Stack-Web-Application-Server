import { number } from "better-auth";
import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma.js";

const createBooking = async (payload: Booking) => {
    const slot = await prisma.tutorSlot.findUnique({
        where: { id: payload.tutorSlotsId }
    })

    if (!slot) throw new Error("Slot not found");
    if (!slot.isActive) throw new Error("Slot not active");

    const serverPrice = Number((slot.hourlyRate * Number(slot.duration))) / 60;


    if (Number(payload.totalPrice) !== Number(serverPrice.toFixed(2))) {
        throw new Error("Price mismatch");
    }

    return await prisma.booking.create({

        data: payload
    })
}


export const bookingService = {
    createBooking
}


