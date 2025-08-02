import { repositories } from "../repositories";
import { BookingService } from "./booking.services";

const { bookingRepository, idempotencyRepository } = repositories

export const services = {
  bookingService: new BookingService(bookingRepository, idempotencyRepository)
}