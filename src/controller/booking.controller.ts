import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger.config";
import { BookingService } from "../services/booking.services";


export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Creating a new booking");
      const booking = await this.bookingService.createBooking(req.body);
      logger.info("Booking created successfully");
      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking
      });
    } catch (error) {
      logger.error("Error creating a new booking");
      next(error);
    }
  }
}