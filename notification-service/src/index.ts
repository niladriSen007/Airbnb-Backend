import express from 'express';
import { serverConfig } from "./config";
import { logger } from './config/logger.config';
import { genericErrorHandler, globalErrorHandler } from './middleware/error/error.middleware';
import { setupMailerWorker } from './processor/email.processor';
import apiRouter from './router';
import { renderMailTemplate } from './templat/template.handler';

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

  const res = await renderMailTemplate("welcome", { name: "John Doe", appName: "BookingApp" });

  console.log(`Test email template rendered successfully , content: ${res}`);
});