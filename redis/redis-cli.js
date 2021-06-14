const redis = require("redis");
const util = require("util");

//For use redis cloud
// const client = redis.createClient({
//   host: process.env.REDIS_URL,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD
// });

//For test on redis local
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);

client.on("ready", function() {
  console.log("Connected to Redis server successfully");
});
client.on("error", (err) => {
  console.log("Error " + err);
});

client.get = util.promisify(client.get);

const getKey = async (key) => {
  const value = client.get(key);
  return value;
};

const setKey = async (key, data, time = 10) => {
  client.set(key, data);
  client.expireat(key, parseInt(+new Date() / 1000) + time);
};

module.exports = {
  getKey,
  setKey,
};
