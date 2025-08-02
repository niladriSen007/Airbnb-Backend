import { Router } from "express";
import bookingRouter from "./booking/booking.router"

const v1Router = Router();

v1Router.use("/booking", bookingRouter)

export default v1Router;