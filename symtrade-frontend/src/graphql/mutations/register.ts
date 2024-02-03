import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
mutation Register($name: String!, $password: String!) {
  register(name: $name, password: $password) {
    token
    userId
  }
}
`;