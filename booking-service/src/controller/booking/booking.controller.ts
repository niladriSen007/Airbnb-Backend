import { Request, Response } from "express";
import { logger } from "../../config/logger.config";
import { BookingService } from "../../services/booking.services";
import { HttpStatusCode } from "../../utils/types";


export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  async createBooking(req: Request, res: Response) {
    try {
      logger.info("Creating a new booking");
      const booking = await this.bookingService.createBooking({
        userId: req.body.userId,
        hotelId: req.body.hotelId,
        bookingAmount: req.body.bookingAmount,
        totalGuests: req.body.totalGuests
      });
      logger.info("Booking created successfully");
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Booking created successfully",
        data: booking
      });
    } catch (error) {
      logger.error("Error creating a new booking");
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error creating a new booking",
        error: error
      });
    }
  }


  async confirmBooking(req: Request, res: Response) {
    try {
      logger.info("Confirming a booking");
      const booking = await this.bookingService.finalizeBooking(req.params.idempotencyId);
      logger.info("Booking confirmed successfully");
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Booking confirmed successfully",
        data: booking
      });
    } catch (error) {
      logger.error("Error confirming a booking");
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error confirming a booking",
        error: error
      });
    }
  }
}