import bcrypt from 'bcryptjs';
import { User } from '../../models';
import { createActiveSession } from '../../controllers/createActiveSession';
import { ObjectId } from 'mongodb'; 

interface LoginArgs {
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

const loginMutation = {
  Mutation: {
    login: async (
      _: undefined,
      { name, password }: LoginArgs,
    ): Promise<ActiveSessionDocument> => {
      const user : User | null = await User.findOne({ name });
      if (!user) throw new Error('Invalid Login');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid Login');

      const activeSession = await createActiveSession(user);
      return activeSession;
    },
  },
};

export default loginMutation;