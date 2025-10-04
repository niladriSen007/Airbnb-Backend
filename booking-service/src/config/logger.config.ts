import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file";
import chalk from "chalk";

// Helper functions for colored logging
export const loggers = {
  info: (message: string) => logger.info(chalk.blue.bold(message)),
  success: (message: string) => logger.info(chalk.green(message)),
  warning: (message: string) => logger.warn(chalk.yellow(message)),
  error: (message: string) => logger.error(chalk.red(message)),
  debug: (message: string) => logger.debug(chalk.magenta(message)),
};

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
    winston.format.printf( ({  level, message, timestamp, ...data }) => {
        const output = { 
            level,
            message, 
            timestamp, 
            /* correlationId: getCorrelationId(),  */
            data 
        };
        return JSON.stringify(output);
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp }) => {
          // Preserve chalk colors in console output
          return `${timestamp} [${level}]: ${message}`;
        })
      )
    }),
    new DailyRotateFile({
        filename: "logs/%DATE%-app.log", // The file name pattern
        datePattern: "YYYY-MM-DD", // The date format
        maxSize: "20m", // The maximum size of the log file
        maxFiles: "14d", // The maximum number of log files to keep
        format: winston.format.combine(
          winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
          winston.format.json() // Keep JSON format for file logs
        )
    })
    // TODO: add logic to integrate and save logs in mongo
]
})