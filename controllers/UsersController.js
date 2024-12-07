const sha1 = require('sha1');
const dbClient = require('../utils/db');

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

module.exports = { users };
