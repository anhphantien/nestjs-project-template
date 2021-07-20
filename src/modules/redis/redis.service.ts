import { REDIS_HOST, REDIS_PORT } from '@/constants';
import { Injectable } from '@nestjs/common';
import redis = require('redis');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('bluebird').promisifyAll(redis);

@Injectable()
export class RedisService {
  private client: redis.RedisClient | any;

  constructor() {
    this.client = redis.createClient({
      host: REDIS_HOST,
      port: REDIS_PORT,
    });
  }

  setAsync(key: string, value: string, mode: 'EX' | 'PX', duration: number) {
    return this.client.setAsync(key, value, mode, duration);
  }

  getAsync(key: string) {
    return this.client.getAsync(key);
  }

  delAsync(key: string) {
    return this.client.delAsync(key);
  }

  ttlAsync(key: string) {
    return this.client.ttlAsync(key);
  }
}
