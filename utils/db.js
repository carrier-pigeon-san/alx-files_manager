const { MongoClient } = require('mongodb');

const port = process.env.DB_PORT || 27017;
const host = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    (async () => {
      try {
        await this.client.connect();
        this.db = this.client.db(dbName);
      } catch (err) {
        console.log(err.message);
        this.client.close();
        this.db = false;
      }
    })();
  }

  isAlive() {
    return !!this.client && !!this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    return new Promise((resolve, reject) => {
      this.db.collection('users').countDocuments((err, count) => {
        if (err) reject(err);
        resolve(count);
      });
    });
  }

  async nbFiles() {
    return new Promise((resolve, reject) => {
      this.db.collection('files').countDocuments((err, count) => {
        if (err) reject(err);
        resolve(count);
      });
    });
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
