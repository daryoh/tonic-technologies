require('dotenv').config();

module.exports = {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    redisExpiry: process.env.REDIS_EXPIRY || 3600, // 1 hour in seconds
};