const fs = require('fs');
const { ObjectId } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

const files = async (req, res) => {
  const token = req.get('X-Token');
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const redisTokenKey = `auth_${token}`;
  const userId = await redisClient.get(redisTokenKey);
  if (!userId) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(userId) });
  if (!user) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const {
    name, type, parentId, isPublic, data,
  } = req.body;
  if (!name) {
    return res.status(400).send({ error: 'Missing name' });
  }

  if (!type) {
    return res.status(400).send({ error: 'Missing type' });
  }

  if (!data && type !== 'folder') {
    return res.status(400).send({ error: 'Missing data' });
  }

  if (parentId) {
    const parent = await dbClient.db.collection('files').findOne({ _id: ObjectId(parentId) });
    if (!parent) {
      return res.status(400).send({ error: 'Parent not found' });
    }

    if (parent.type !== 'folder') {
      return res.status(400).send({ error: 'Parent is not a folder' });
    }
  }

  const file = {
    userId,
    name,
    type,
    parentId: parentId || 0,
    isPublic: isPublic || false,
    data: data || null,
  };

  if (type === 'folder') {
    const newFile = await dbClient.db.collection('files').insertOne(file);
    const { _id, ...fileInfo } = newFile.ops[0];
    return res.status(201).send({ id: _id, ...fileInfo });
  }

  const path = process.env.FOLDER_PATH || '/tmp/files_manager';
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  const buff = Buffer.from(data, 'base64');
  const filePath = `${path}/${uuidv4()}`;

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, buff, async (error) => {
      if (error) {
        return reject(res.status(500).send({ error: 'Cannot write the file' }));
      }

      const newFile = await dbClient.db.collection('files').insertOne({ ...file, localPath: filePath });
      return resolve(res.status(201).send({ id: newFile.insertedId, ...file }));
    });
  });
};

module.exports = {
  files,
};
