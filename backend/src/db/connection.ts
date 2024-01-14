import { connect, disconnect } from 'mongoose';

const cloudDB = process.env.MONGODB_URL;
const localDB = process.env.MONGODB_LOCAL_URL;
const whichDB = process.env.WHICH_MONGODB;

// Connects to the preferred MongoDB database.
async function connectToDB() {
  const db = whichDB === 'cloud' ? cloudDB : localDB;
  try {
    await connect(db);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
    throw new Error('Could not connect to MongoDB');
  }
}

// Disconnects from the MongoDB database.
async function disconnectFromDB() {
  try {
    await disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.log(error);
    throw new Error('Could not disconnect from MongoDB');
  }
}

export { connectToDB, disconnectFromDB };
