import { RequestHandler, Router } from "express";
import { validateRequestBody } from "../../../validators";
import { createBookingSchema } from "../../../validators/booking.validator";
import { controllers } from "../../../controller";

const {bookingController} = controllers

const bookingRouter = Router();

bookingRouter.post("/", validateRequestBody(createBookingSchema) as RequestHandler,async(req,res)=>{
  await bookingController.createBooking(req, res);
})

bookingRouter.post("/confirm/:idempotencyId", async(req,res)=>{
  await bookingController.confirmBooking(req, res);
})

export default bookingRouter;