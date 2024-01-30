

import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

// Define your mock response
const mockResponse = {
  request: {
    query: LOGIN_MUTATION,
    variables: {
      username: 'test',
      password: 'test',
    },
  },
  result: {
    data: {
      login: {
        token: 'mock-token',
        user: {
          id: '1',
          username: 'test',
          email: 'test@test.com',
        },
      },
    },
  },
};

export default mockResponse;