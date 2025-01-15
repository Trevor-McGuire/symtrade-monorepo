

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
const mockLoginResponse = {
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



const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
      }
    }
  }
`;
const mockRegisterResponse = {
  request: {
    query: REGISTER_MUTATION,
    variables: {
      username: 'test',
      email: 'test@test.com',
      password: 'test',
    },
  },
  result: {
    data: {
      register: {
        user: {
          id: '1',
          username: 'test',
          email: 'test@test.com',
        },
      },
    },
  },
};

export {
  mockLoginResponse,
  mockRegisterResponse,
};