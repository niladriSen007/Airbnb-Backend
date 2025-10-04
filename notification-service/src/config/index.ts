
import dotenv from 'dotenv';
import { ServerConfig } from './types';


function loadDotEnv() {
  const env = dotenv.config();
  if (env.error) {
    throw env.error;
  }
  return "Environment variables loaded successfully";
}
loadDotEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 4000,
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  MAILER_USER: process.env.MAILER_USER || "",
  MAILER_PASS: process.env.MAILER_PASS || ""
}
