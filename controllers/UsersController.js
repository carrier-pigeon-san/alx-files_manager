const sha1 = require('sha1');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

const users = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  if (!userEmail) {
    res.status(400).send({ error: 'Missing email' });
    return;
  }
  if (!userPassword) {
    res.status(400).send({ error: 'Missing password' });
    return;
  }
  const user = await dbClient.db.collection('users').findOne({ email: userEmail });
  if (user) {
    res.status(400).send({ error: 'Already exist' });
    return;
  }
  const hashedPassword = sha1(userPassword);
  const newUser = await dbClient.db.collection('users').insertOne({ email: userEmail, password: hashedPassword });

  res.status(201).send({ id: newUser.insertedId, email: userEmail });
};

const userMe = async (req, res) => {
  const token = req.header('X-Token');
  if (!token) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const userId = await redisClient.get(`auth_${token}`);
  if (!userId) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(userId) });
  if (!user) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  res.status(200).send({ id: user._id, email: user.email });
};

module.exports = {
  users,
  userMe,
};
