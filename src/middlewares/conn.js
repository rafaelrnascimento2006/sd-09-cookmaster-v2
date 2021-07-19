const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017';

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db('Cookmaster'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;