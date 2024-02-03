import jwt from 'jsonwebtoken';
import { ActiveSession } from '../models';
import { ObjectId } from 'mongodb'; 

interface User {
  _id: ObjectId;
  name: string;
  password: string;
}

interface ActiveSessionDocument {
  token: string;
  userId: ObjectId;
}

export const createActiveSession = async (user: User): Promise<ActiveSessionDocument> => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '');
  const activeSession = new ActiveSession({ token, userId: user._id });
  await activeSession.save();

  // Ensure that the userId field is not null
  if (!activeSession.userId) {
    throw new Error('User not found');
  }

  return activeSession.toObject();
}