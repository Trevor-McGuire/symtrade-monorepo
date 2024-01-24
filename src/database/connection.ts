import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI not defined in .env file');
}

mongoose.connect(MONGODB_URI);

mongoose.set('debug', true);

export default mongoose.connection;
