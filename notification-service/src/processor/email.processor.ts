import { Job, Worker } from "bullmq";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queue/mailer.queue";
import { getRedisConnObject } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../templat/template.handler";
import { logger } from "../config/logger.config";
import { MailerService } from "../services/mailer.service";


export function setupMailerWorker() {
  const emailProcessor = new Worker<NotificationDto>(
    MAILER_QUEUE,
    async (job: Job) => {
      if (job?.name !== MAILER_PAYLOAD) {
        throw new Error(`Invalid job name: ${job?.name}`)
      }

      //call the service layer
      const payload = job.data;
      console.log(`Processing email: ${JSON.stringify(payload)}`);


      const emailContent = await renderMailTemplate(payload.templateId, payload.params)

      //send email using nodemailer
      const newMailerInstance = new MailerService()
      await newMailerInstance.sendMail(payload.to, payload.subject, emailContent)

      logger.info(`Email sent to ${payload.to} with subject "${payload.subject}"`);

    }, {
      connection: getRedisConnObject()
    }
  )

  emailProcessor.on("completed", () => {
    console.log(`Email processed successfully`)
  })

  emailProcessor.on("failed", (_, err) => {
    console.log(`Email processing failed: ${err.message}`)
  })
}
