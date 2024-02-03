import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) throw new Error('MongoDB URI not defined in .env file');

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to database: ', error);
  }
};

export default connectToDb;