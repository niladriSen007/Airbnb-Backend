import { BookingRepository } from "./booking/booking.repository";
import { IdempotencyRepository } from "./idempotency/idempotency.repository";

export const repositories = {
  bookingRepository: new BookingRepository(),
  idempotencyRepository: new IdempotencyRepository()
}