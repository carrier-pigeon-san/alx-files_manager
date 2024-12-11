const Bull = require('bull');

const fileQueue = new Bull('fileQueue', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
});

module.exports = fileQueue;
