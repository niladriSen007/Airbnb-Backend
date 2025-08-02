import { CreateBookingDTO } from "../dto/booking.dto";
import { BookingRepository } from "../repositories/booking/booking.repository";
import { IdempotencyRepository } from "../repositories/idempotency/idempotency.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/idempotecyGeneration";

export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly idempotencyRepository: IdempotencyRepository
  ) { }

  async createBooking({ userId, hotelId, bookingAmount, totalGuests }: CreateBookingDTO) {
    const booking = await this.bookingRepository.createBooking({
      userId,
      hotelId,
      bookingAmount,
      totalGuests
    })

    const idempotencyKey = generateIdempotencyKey()

    await this.idempotencyRepository.createIdempotencyKey(booking?.id, idempotencyKey)
    return {
      bookingId: booking?.id,
      idempotencyKey
    }
  }


  async finalizeBooking(idempotencyKey: string) {

    const idempotency = await this.idempotencyRepository.getIdempotencyKey(idempotencyKey)

    if (!idempotency) {
      throw new NotFoundError("Invalid idempotency key")
    }

    if (idempotency?.finalized) {
      throw new BadRequestError("Idempotency key is already finalized")
    }

    const booking = await this.bookingRepository?.confirmBooking(idempotency?.bookingId)
    await this.idempotencyRepository.finalizeIdempotencyKey(idempotencyKey)
    return booking

  }
}