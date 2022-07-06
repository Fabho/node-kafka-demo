const createClient  = require('redis');

const redisClient = createClient();

redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

module.exports = redisClient;