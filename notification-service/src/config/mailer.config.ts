import nodemailer from 'nodemailer';
import { serverConfig } from '.';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: serverConfig.MAILER_USER,
    pass: serverConfig.MAILER_PASS
  }
})