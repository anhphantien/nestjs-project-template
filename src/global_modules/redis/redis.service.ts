import { Injectable } from '@nestjs/common';
import bluebird = require('bluebird');
import redis = require('redis');
import config from '../../config';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

@Injectable()
export class RedisService {
  private client;
  constructor() {
    this.client = redis.createClient({
      host: config.REDIS_HOST,
      port: Number(config.REDIS_PORT),
    });
  }

  setAsync(...params) {
    return this.client.setAsync(...params);
  }

  getAsync(...params) {
    return this.client.getAsync(...params);
  }

  delAsync(...params) {
    return this.client.delAsync(...params);
  }

  ttlAsync(...params) {
    return this.client.ttlAsync(...params);
  }
}
