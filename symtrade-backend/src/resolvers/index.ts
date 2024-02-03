import { mergeResolvers } from '@graphql-tools/merge';
import loginMutation from './user/loginMutation';
import registerMutation from './user/registerMutation';
import logoutMutation from './user/logoutMutation';
// import other typeDefs

const typeDefs = mergeResolvers([
  loginMutation,
  registerMutation,
  logoutMutation,
]);

export default typeDefs;
