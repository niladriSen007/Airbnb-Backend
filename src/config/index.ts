
import dotenv from 'dotenv';
import { ServerConfig, DBConfig } from './types.js';


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
}

export const dbConfig: DBConfig = {
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_NAME: process.env.DB_NAME ?? "airbnb_dev",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "user",
  DB_USERNAME: process.env.DB_USERNAME ?? "root",
}