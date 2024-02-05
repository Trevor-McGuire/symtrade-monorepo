import { ActiveSession } from "../../models";

const logoutMutation = {
  Mutation: {
    logout: async (_: any, __: any, { userId }: { userId: any }): Promise<boolean> => {
      console.log('userId from logout resolver', userId);
      if (userId) {
        const deletedSession = await ActiveSession.deleteOne({ userId });
        console.log('deletedSession', deletedSession);
        return true;
      } else {
        throw new Error('User is not authenticated');
      }
    }
  },
};

export default logoutMutation;