"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const typeDefs = `
  type Query {
    hello: String
  }
`;
exports.typeDefs = typeDefs;
const resolvers = {
    Query: {
        hello: () => 'Hello, world!',
    },
};
exports.resolvers = resolvers;
