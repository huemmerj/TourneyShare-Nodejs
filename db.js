require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

let db;

async function connectToMongo() {
  await client.connect();
  console.log('✅ Connected to MongoDB');
  db = client.db(process.env.DB_NAME || 'tournamentsApp');
}


function getDb() {
  return db;
}

module.exports = {
  connectToMongo,
  getDb
};
