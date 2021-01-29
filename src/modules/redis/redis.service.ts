import { Injectable } from '@nestjs/common';
import redis = require('redis');

require('dotenv').config();

@Injectable()
export class RedisService {
  private client: redis.RedisClient;

  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
  }

  set(key: string, value: string, mode: 'EX' | 'PX', duration: number) {
    return this.client.set(key, value, mode, duration);
  }

  get(key: string): Promise<string | null> {
    return new Promise(resolve => {
      this.client.get(key, (_, data) => {
        resolve(data);
      });
    });
  }

  del(key: string) {
    return this.client.del(key);
  }

  ttl(key: string): Promise<number> {
    return new Promise(resolve => {
      this.client.ttl(key, (_, data) => {
        resolve(data);
      });
    });
  }
}
