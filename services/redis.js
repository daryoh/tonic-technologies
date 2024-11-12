const Redis = require('ioredis');
const config = require('../configs');

class RedisService {
  constructor() {
    this.client = new Redis(config.redisUrl);
  }

  async get(key) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key, value, expiry = config.redisExpiry) {
    await this.client.set(key, JSON.stringify(value), 'EX', expiry);
  }

  async del(key) {
    await this.client.del(key);
  }
}

module.exports = new RedisService();
