const redis = require("redis");

let redisPort = 6379;  // Replace with your redis port
let redisHost = "127.0.0.1";  // Replace with your redis host
const client = redis.createClient({
    socket: {
      port: redisPort,
      host: redisHost,
    }
  });

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', ()=> {
  console.log("connected to REDIS...")
})
client.connect();

module.exports = client;