const redis = require('redis');
//TODO make this secure, hide the credentials

module.exports = redis.createClient({
  host: 'redis-10907.c135.eu-central-1-1.ec2.cloud.redislabs.com',
  port: 10907,
  no_ready_check: true,
  auth_pass: 'CnpxZ1K7dicoHkDmQDmprJ7UYmLpZsmj'
});