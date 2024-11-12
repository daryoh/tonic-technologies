module.exports = {
    redisPort: process.env.REDIS_PORT || 11075,
    redisHost: process.env.REDIS_HOST || 'redis-11075.c12.us-east-1-4.ec2.cloud.redislabs.com',
    redisUrl: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    redisPassword: process.env.REDIS_PASSWORD || `bLCTebMoAB3u2RQOmTJVnABScHlTdRFH`
}


 
  
    