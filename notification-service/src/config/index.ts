
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
  REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || "redis://localhost:6379"
}
