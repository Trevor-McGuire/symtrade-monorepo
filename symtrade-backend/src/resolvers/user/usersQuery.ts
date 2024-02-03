interface UserArgs {
  id: string;
}

interface UserDocument {
  _id: string;
  name: string;
  password: string;
}

const userQuery = {
  Query: {
    user: async (_: undefined, { id }: UserArgs): Promise<UserDocument | null> => {
      return null;
    }
  }
};

export default userQuery;