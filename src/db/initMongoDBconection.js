//? ПІДКЮЧЕННЯ ДО БАЗИ ДАНИХ МОНГО

import mongoose from 'mongoose';
import env from '../utils/env.js';

const initMongo = async () => {
  //? пишемо обов'язково пароль і назву бази до якої доєднуємося
  try {
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const databaseUrl = env('MONGODB_URL');
    const databaseName = env('MONGODB_NAME');

    const DB_HOST = `mongodb+srv://${user}:${password}@${databaseUrl}/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(DB_HOST);
    console.log('Database connection success');
  } catch (error) {
    console.log(`Error connect to database ${error.message}`);
    throw error;
  }
};
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Failed to connect to MongoDB: ${err.message}`);
});

export default initMongo;
