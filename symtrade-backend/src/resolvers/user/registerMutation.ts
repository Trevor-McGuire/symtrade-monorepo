import bcrypt from 'bcryptjs';
import { User } from '../../models';
import { createActiveSession } from '../../controllers/createActiveSession';
import { ObjectId } from 'mongodb'; 

interface RegisterArgs {
  name: string;
  password: string;
}

interface ActiveSessionDocument {
  token: string;
  userId: ObjectId;
}

interface User {
  _id: ObjectId;
  name: string;
  password: string;
}

const registerMutation = {
  Mutation: {
    register: async (
      _: undefined,
      { name, password }: RegisterArgs,
    ): Promise<ActiveSessionDocument> => {
      const existingUser = await User.findOne({ name });
      if (existingUser) throw new Error('User already exists with this name');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, password: hashedPassword });
      const savedUser = await user.save();

      const activeSession = await createActiveSession(savedUser);
      return activeSession;
    },
  },
};

export default registerMutation;
