import IORedis, { Redis } from 'ioredis';
import Redlock from 'redlock';
import { serverConfig } from '.';
import { logger } from './logger.config';

function connectToRedis() {
  try {
    let connection: Redis;

    return () => {
      if (!connection) {
        connection = new IORedis(serverConfig.REDIS_SERVER_URL);
        logger.info('Connected to Redis');
      }
      return connection;
    }
  } catch (error) {
    console.error('Error connecting to Redis:', error);
    throw error;
  }
}

export const getRedisConnectionObject = connectToRedis();

export const redlock = new Redlock(
  [getRedisConnectionObject()],
  {
    driftFactor: 0.01, // time in ms
    retryCount: 10,
    retryDelay: 200, // time in ms
    retryJitter: 200 // time in ms
  }
)