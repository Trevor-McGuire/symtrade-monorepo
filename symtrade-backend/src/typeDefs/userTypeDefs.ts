import gql from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    name: String!
    password: String!
  }

  type ActiveSession {
    token: String!
    userId: String!
  }

  type Mutation {
    login(name: String!, password: String!): ActiveSession
    register(name: String!, password: String!): ActiveSession
    logout: Boolean
  }

  type Query {
    users: [User]
  }
`;
