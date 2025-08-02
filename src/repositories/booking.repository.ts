import { Prisma } from "@prisma/client";
import prismaClint from "../prisma/client";

export class BookingRepository {
  constructor() {}
  async createBooking(bookingData: Prisma.BookingCreateInput) {
    const booking = await prismaClint?.booking.create({ data: bookingData })
    return booking
  }
}