import { CreateBookingDTO } from "../dto/booking.dto";
import { BookingRepository } from "../repositories/booking/booking.repository";
import { IdempotencyRepository } from "../repositories/idempotency/idempotency.repository";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/idempotecyGeneration";
import prismaClient from "../prisma/client";
import { redlock } from "../config/redis.config";
import { serverConfig } from "../config";

export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly idempotencyRepository: IdempotencyRepository
  ) { }

  async createBooking({ userId, hotelId, bookingAmount, totalGuests }: CreateBookingDTO) {


    const time_to_live = serverConfig?.LOCK_TTL;  // for the next 5 minutes the hotel will be locked for us so no other user can book the same hotel
    //but after 5 minutes the hotel will be available for booking again

    const bookingLockResource = `hotel-${hotelId}`


    try {
      await redlock.acquire([bookingLockResource], time_to_live);

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
    } catch (error) {
      throw new InternalServerError('Failed to acquire lock for booking resource');
    }
  }


  async finalizeBooking(idempotencyKey: string) {

    return await prismaClient.$transaction(async (tx) => {
      const idempotency = await this.idempotencyRepository.getIdempotencyKeyWithLock(tx, idempotencyKey)

      if (!idempotency || !idempotency?.bookingId) {
        throw new NotFoundError("Invalid idempotency key")
      }

      if (idempotency?.finalized) {
        throw new BadRequestError("Idempotency key is already finalized")
      }

      const booking = await this.bookingRepository?.confirmBooking(tx, idempotency?.bookingId,)
      await this.idempotencyRepository.finalizeIdempotencyKey(tx, idempotencyKey)
      return booking
    })

  }
}