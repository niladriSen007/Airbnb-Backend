import { services } from "../services"
import { BookingController } from "./booking.controller"

export const controllers =  {
  bookingController: new BookingController(services?.bookingService)
}