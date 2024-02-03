import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './userTypeDefs';
// import other typeDefs

const typeDefs = mergeTypeDefs([
  userTypeDefs,
  // other typeDefs
]);

export default typeDefs;
