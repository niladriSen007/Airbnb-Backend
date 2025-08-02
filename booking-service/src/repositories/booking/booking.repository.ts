import { Prisma } from "@prisma/client";
import prismaClient from "../../prisma/client";

export class BookingRepository {
  constructor() { }
  async createBooking(bookingData: Prisma.BookingCreateInput) {
    const booking = await prismaClient?.booking.create({ data: bookingData })
    return booking
  }

  async getBookingById(bookingId: number) {
    const booking = await prismaClient?.booking.findUnique({ where: { id: bookingId } })
    return booking
  }

  async confirmBooking(tx: Prisma.TransactionClient, bookingId: number) {
    const booking = await tx?.booking.update({ where: { id: bookingId }, data: { status: "CONFIRMED" } })
    return booking
  }

  async cancelBooking(bookingId: number) {
    const booking = await prismaClient?.booking.update({ where: { id: bookingId }, data: { status: "CANCELLED" } })
    return booking
  }
}