import express from 'express';
import { serverConfig } from "./config"
import { genericErrorHandler, globalErrorHandler } from './middleware/error/error.middleware';
import { loggers } from './config/logger.config';
import apiRouter from './router';
import { addEmailToQueue } from './producers/email.producer';

const app = express();

app.use(express.json());

app.use("/api", apiRouter)

app.use(globalErrorHandler)
app.use(genericErrorHandler)

app.listen(serverConfig.PORT, async () => {
  loggers.info(`Server is running on port ${serverConfig.PORT}`);
  loggers.warning(`Press Ctrl+C to stop the server.`);
  loggers.success(`Database connection has been established successfully.`);


  addEmailToQueue({
    to: 'recipient@example.com',
    subject: 'Sample Email from booking',
    templateId: 'templateId',
    params: {
      name: 'John Doe',
      message: 'This is a sample notification message.'
    }
  })
});