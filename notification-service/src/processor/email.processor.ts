import { Job, Worker } from "bullmq";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queue/mailer.queue";
import { getRedisConnObject } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";


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

    }, {
    connection: getRedisConnObject()
  }
  )

  emailProcessor.on("completed", (job) => {
    console.log(`Email processing successfully`)
  })

  emailProcessor.on("failed", (job, err) => {
    console.log(`Email processing failed`)
  })
}
