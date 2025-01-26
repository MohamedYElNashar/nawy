import { MongoClient } from 'mongodb'
import Papr, * as papr from 'papr'

let client: MongoClient;

const corePapr = new Papr();
const contentPapr = new Papr();

export async function connect() {
  if (client) {
    return;
  }

  const uri = process.env.MONGO_URI || 'mongodb://nawy:nawypassword@localhost:27017/core?authSource=admin'
  
  if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment variables.');
  }

  try {
    client = await MongoClient.connect(uri, {
      ignoreUndefined: true,
    });

    corePapr.initialize(client.db('core'));
    contentPapr.initialize(client.db('content'));

    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

export async function disconnect() {
  if (client) {
    await client.close();
    console.log('Disconnected from MongoDB.');
  }
}

export { client, corePapr, contentPapr, papr };
