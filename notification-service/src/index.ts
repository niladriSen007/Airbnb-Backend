import express from 'express';
import { serverConfig } from "./config"
import { genericErrorHandler, globalErrorHandler } from './middleware/error/error.middleware';
import { logger } from './config/logger.config';
import apiRouter from './router';
import { setupMailerWorker } from './processor/email.processor';
import { NotificationDto } from './dto/notification.dto';
import { addEmailToQueue } from './producers/email.producer';

const app = express();

app.use(express.json());

app.use("/api", apiRouter)

app.use(globalErrorHandler)
app.use(genericErrorHandler)

app.listen(serverConfig.PORT, async () => {
  logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info(`Press Ctrl+C to stop the server.`);
  logger.info('Database connection has been established successfully.');
  setupMailerWorker();
  logger.info('Mailer worker has been set up successfully.');

  const sampleNotification: NotificationDto = {
    to: 'recipient@example.com',
    subject: 'Sample Email',
    templateId: 'templateId',
    params: {
      name: 'John Doe',
      message: 'This is a sample notification message.'
    }
  };
  addEmailToQueue(sampleNotification);
});