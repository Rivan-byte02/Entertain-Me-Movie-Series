const { MongoClient } = require("mongodb");

let database = null;

async function connect() {
  try {
    const uri = "mongodb://localhost:27017";

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    await client.connect();

    const db = client.db("entertain-me");

    database = db;

    return db;
  } catch (error) {
    console.log(err);
  }
}

function getDatabase() {
  return database;
}

module.exports = {
  connect,
  getDatabase,
};
