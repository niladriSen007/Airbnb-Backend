import { Prisma } from "@prisma/client";
import { BookingRepository } from "../repositories/booking.repository";

export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) { }

  async createBooking(bookingData: Prisma.BookingCreateInput) {
    const booking = await this.bookingRepository.createBooking(bookingData)
    return booking
  }
}