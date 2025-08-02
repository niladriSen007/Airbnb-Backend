import { repositories } from "../repositories";
import { BookingService } from "./booking.services";

export const services = {
  bookingService: new BookingService(repositories.bookingRepository)
}