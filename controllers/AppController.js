const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const status = async (req, res) => {
  const redis = redisClient.isAlive();
  const db = dbClient.isAlive();

  res.status(200).send({ redis, db });
};

const stats = async (req, res) => {
  const users = await dbClient.nbUsers();
  const files = await dbClient.nbFiles();

  res.status(200).send({ users, files });
};

module.exports = {
  status,
  stats,
};
